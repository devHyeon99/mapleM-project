import { NextResponse } from "next/server";
// 'anon' 키를 사용하는 표준 서버 클라이언트를 가져옵니다.
import { createClient } from "@/utils/supabase/server";

// 넥슨 API 응답에 대한 타입 정의
interface NexonOcidResponse {
  ocid: string;
}

interface NexonBasicInfoResponse {
  character_name: string;
  world_name: string;
  character_level: number;
  character_job_name: string;
}

// 넥슨 API 기본 URL
const NEXON_API_BASE_URL = "https://open.api.nexon.com/maplestorym/v1";

export async function POST(request: Request) {
  // 1. Supabase 클라이언트 생성 및 사용자 인증
  const supabase = createClient();
  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "캐릭터를 추가하려면 로그인이 필요합니다." },
      { status: 401 },
    );
  }

  // 2. 환경 변수 및 요청 본문 유효성 검사
  const NEXON_API_KEY = process.env.NEXON_API_KEY;
  if (!NEXON_API_KEY) {
    console.error("NEXON_API_KEY가 설정되지 않았습니다.");
    return NextResponse.json(
      { error: "서버 설정 오류입니다. 관리자에게 문의하세요." },
      { status: 500 },
    );
  }

  const { account_id, name, world_name } = await request.json();

  if (!name || !world_name) {
    return NextResponse.json(
      { error: "캐릭터 이름과 월드명을 모두 입력해야 합니다." },
      { status: 400 },
    );
  }

  const headers = { "x-nxopen-api-key": NEXON_API_KEY };

  try {
    // 3. 넥슨 API: 닉네임으로 OCID 요청
    const ocidApiUrl = new URL(`${NEXON_API_BASE_URL}/id`);
    ocidApiUrl.searchParams.append("character_name", name);
    ocidApiUrl.searchParams.append("world_name", world_name);

    const ocidResponse = await fetch(ocidApiUrl.toString(), { headers });
    if (!ocidResponse.ok) {
      const errorData = await ocidResponse.json();
      throw new Error(
        `넥슨 API 오류: OCID를 찾을 수 없습니다. (${errorData.error?.message || ocidResponse.statusText})`,
      );
    }
    const { ocid }: NexonOcidResponse = await ocidResponse.json();

    // 4. 넥슨 API: OCID로 캐릭터 기본 정보 요청
    const basicInfoApiUrl = new URL(`${NEXON_API_BASE_URL}/character/basic`);
    basicInfoApiUrl.searchParams.append("ocid", ocid);

    const basicInfoResponse = await fetch(basicInfoApiUrl.toString(), {
      headers,
    });
    if (!basicInfoResponse.ok) {
      const errorData = await basicInfoResponse.json();
      throw new Error(
        `넥슨 API 오류: 캐릭터 정보를 가져오지 못했습니다. (${errorData.error?.message || basicInfoResponse.statusText})`,
      );
    }
    const nexonData: NexonBasicInfoResponse = await basicInfoResponse.json();

    // 5. DB에 저장할 데이터 조합 (인증된 사용자 ID 사용)
    const characterToSave = {
      account_id,
      ocid,
      name: nexonData.character_name,
      job: nexonData.character_job_name,
      level: nexonData.character_level,
    };

    // 6. Supabase DB에 데이터 삽입 (RLS 정책 적용)
    const { data, error } = await (await supabase)
      .from("characters")
      .insert(characterToSave)
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      // 중복된 ocid 또는 name 컬럼에 대한 에러 처리
      if (error.code === "23505") {
        // PostgreSQL unique violation error code
        throw new Error("이미 등록된 캐릭터입니다.");
      }
      throw new Error("데이터베이스에 캐릭터를 추가하는 데 실패했습니다.");
    }

    // 7. 성공 응답 반환
    return NextResponse.json(data);
  } catch (err: unknown) {
    console.error("캐릭터 추가 API 최종 오류:", err);
    const message =
      err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

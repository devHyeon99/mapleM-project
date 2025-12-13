(() => {
  // Edit this list to match the rows you want to extract.
  // Example: ["무기 170", "무기 190", "무기 200"]
  const TARGETS = ["엠블렘, 보조무기 180", "엠블렘 200 / 감시자의 눈"];
  const HEADER_TEXT = "에디셔널 잠재능력 등급";

  const clean = (s) =>
    (s || "")
      .replace(/\u00A0/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const trs = [...document.querySelectorAll("tr")];

  const getCells = (tr) =>
    [...tr.querySelectorAll("td, th")].map((el) => clean(el.innerText));

  const isBlankCell = (v) => !v || v === "　";

  const isValidTriple = (triple) =>
    triple.length === 3 &&
    triple[0] &&
    triple[1] &&
    triple[2] &&
    triple[0] !== "잠재옵션" &&
    triple[1] !== "수치" &&
    triple[2] !== "확률";

  function parseBlock(headerIndex, fallbackEquipLevelText) {
    const headerCells = getCells(trs[headerIndex]).filter(
      (v) => !isBlankCell(v),
    );

    const rarityIdx = headerCells.findIndex((v) => v === HEADER_TEXT);
    const equipIdx = headerCells.findIndex((v) => v === "장비 분류 / 레벨");

    const rarityText =
      rarityIdx >= 0 && headerCells[rarityIdx + 1]
        ? headerCells[rarityIdx + 1]
        : "";

    const equipLevelText =
      equipIdx >= 0 && headerCells[equipIdx + 1]
        ? headerCells[equipIdx + 1]
        : fallbackEquipLevelText;

    const firstRows = [];
    const secondaryRows = [];

    let seenSectionHeader = false;

    for (let i = headerIndex + 1; i < trs.length; i++) {
      const row = getCells(trs[i]);
      const nonBlank = row.filter((v) => !isBlankCell(v));
      const rowText = nonBlank.join(" ");

      if (!nonBlank.length) continue;

      if (
        rowText.includes(HEADER_TEXT) &&
        rowText.includes("장비 분류 / 레벨")
      ) {
        break;
      }

      if (rowText.includes("첫번째 옵션") || rowText.includes("세번째 옵션")) {
        seenSectionHeader = true;
        continue;
      }

      if (!seenSectionHeader) continue;

      if (
        rowText.includes("잠재옵션") &&
        rowText.includes("수치") &&
        rowText.includes("확률")
      ) {
        continue;
      }

      if (row.length >= 7) {
        const leftTriple = row.slice(0, 3).map(clean);
        const rightTriple = row.slice(4, 7).map(clean);

        if (isValidTriple(leftTriple)) firstRows.push(leftTriple);
        if (isValidTriple(rightTriple)) secondaryRows.push(rightTriple);
        continue;
      }

      if (nonBlank.length >= 6) {
        const leftTriple = nonBlank.slice(0, 3);
        const rightTriple = nonBlank.slice(3, 6);

        if (isValidTriple(leftTriple)) firstRows.push(leftTriple);
        if (isValidTriple(rightTriple)) secondaryRows.push(rightTriple);
        continue;
      }
    }

    return {
      rarityText,
      equipLevelText,
      firstRows,
      secondaryRows,
    };
  }

  function parseTarget(target) {
    const headerIndexes = trs
      .map((tr, idx) => ({ tr, idx }))
      .filter(({ tr }) => {
        const text = clean(tr.innerText);
        return text.includes(target) && text.includes(HEADER_TEXT);
      })
      .map(({ idx }) => idx);

    if (!headerIndexes.length) {
      console.warn(`⚠️ '${target}' 포함 헤더 행을 찾지 못했습니다.`);
      return null;
    }

    const results = headerIndexes.map((idx) => parseBlock(idx, target));

    return Object.fromEntries(
      results.map((block) => [block.rarityText, block]),
    );
  }

  const output = Object.fromEntries(
    TARGETS.map((target) => [target, parseTarget(target)]).filter(
      ([, value]) => value != null,
    ),
  );

  console.log("🎯 에디셔널 전체 결과");
  console.log(output);

  copy(JSON.stringify(output, null, 2));
})();

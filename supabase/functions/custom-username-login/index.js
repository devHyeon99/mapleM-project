"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var supabase_js_2_1 = require("npm:@supabase/supabase-js@2");
var cors_ts_1 = require("../_shared/cors.ts");
var supabaseAdmin = (0, supabase_js_2_1.createClient)(Deno.env.get('SUPABASE_URL'), Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'));
Deno.serve(function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, _b, profile, profileError, _c, user, userError, _d, sessionData, signInError, error_1;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                if (req.method === 'OPTIONS') {
                    return [2 /*return*/, new Response('ok', { headers: cors_ts_1.corsHeaders })];
                }
                _e.label = 1;
            case 1:
                _e.trys.push([1, 6, , 7]);
                return [4 /*yield*/, req.json()];
            case 2:
                _a = _e.sent(), username = _a.username, password = _a.password;
                if (!username || !password) {
                    throw new Error('아이디와 비밀번호를 모두 입력해주세요.');
                }
                return [4 /*yield*/, supabaseAdmin
                        .from('profiles')
                        .select('id')
                        .eq('username', username)
                        .single()];
            case 3:
                _b = _e.sent(), profile = _b.data, profileError = _b.error;
                if (profileError || !profile) {
                    throw new Error('아이디 또는 비밀번호가 올바르지 않습니다.');
                }
                return [4 /*yield*/, supabaseAdmin.auth.admin.getUserById(profile.id)];
            case 4:
                _c = _e.sent(), user = _c.data.user, userError = _c.error;
                if (userError || !user) {
                    throw new Error('인증 시스템에서 사용자를 찾을 수 없습니다.');
                }
                return [4 /*yield*/, supabaseAdmin.auth.signInWithPassword({
                        email: user.email,
                        password: password,
                    })];
            case 5:
                _d = _e.sent(), sessionData = _d.data, signInError = _d.error;
                if (signInError) {
                    throw new Error('아이디 또는 비밀번호가 올바르지 않습니다.');
                }
                return [2 /*return*/, new Response(JSON.stringify(sessionData), {
                        headers: __assign(__assign({}, cors_ts_1.corsHeaders), { 'Content-Type': 'application/json' }),
                        status: 200,
                    })];
            case 6:
                error_1 = _e.sent();
                console.error('Custom Login Function Error:', error_1.message);
                return [2 /*return*/, new Response(JSON.stringify({ error: error_1.message }), {
                        headers: __assign(__assign({}, cors_ts_1.corsHeaders), { 'Content-Type': 'application/json' }),
                        status: 400,
                    })];
            case 7: return [2 /*return*/];
        }
    });
}); });

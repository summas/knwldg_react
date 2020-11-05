import { truncateString } from "./common";

test('文字列の切り出し：指定した文字数を超えると３点リーダを付与する', () => {
    expect(truncateString("test", 2)).toBe("te...");
});

test('文字列の切り出し：指定した文字数を超えない場合はそのままの文字列を返す', () => {
    expect(truncateString("test", 4)).toBe("test");
});
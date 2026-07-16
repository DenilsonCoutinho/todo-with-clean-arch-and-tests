import { describe, expect, it } from "vitest";
import sanitizeStr from "./sanitizeStr";

describe("sanitizeStr", () => {
  it("deve remover espacos no inicio e no fim", () => {
    expect(sanitizeStr("   Estudar testes   ")).toBe("Estudar testes");
  });

  it("deve retornar string vazia quando receber uma string vazia", () => {
    expect(sanitizeStr("")).toBe("");
  });

  it("deve retornar string vazia para valores nao textuais", () => {
    // @ts-expect-error validando entrada invalida em runtime
    expect(sanitizeStr(null)).toBe("");
  });
});

"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BYTE_CAPACITY: Record<string, number[]> = {
  L: [
    17, 32, 53, 78, 106, 134, 154, 192, 230, 271, 321, 367, 425, 458, 520, 586,
    644, 718, 792, 858, 929, 1003, 1091, 1171, 1273, 1367, 1465, 1528, 1628,
    1732, 1840, 1952, 2068, 2188, 2303, 2431, 2563, 2699, 2809, 2953,
  ],
  M: [
    14, 26, 42, 62, 84, 106, 122, 152, 180, 213, 251, 287, 331, 362, 412, 450,
    504, 560, 624, 666, 711, 779, 857, 911, 997, 1059, 1125, 1190, 1264, 1370,
    1452, 1538, 1628, 1722, 1809, 1911, 1989, 2099, 2213, 2331,
  ],
  Q: [
    11, 20, 32, 46, 60, 74, 86, 108, 130, 151, 177, 203, 241, 258, 292, 322,
    364, 394, 442, 482, 509, 565, 611, 661, 715, 751, 805, 868, 908, 982, 1030,
    1112, 1168, 1228, 1283, 1351, 1423, 1499, 1579, 1663,
  ],
  H: [
    7, 14, 24, 34, 44, 58, 64, 84, 98, 119, 137, 155, 177, 194, 220, 250, 280,
    310, 338, 382, 403, 439, 461, 511, 535, 593, 625, 658, 698, 742, 790, 842,
    898, 958, 983, 1051, 1093, 1139, 1219, 1273,
  ],
};

interface AdvancedSettingsProps {
  margin: number;
  errorCorrectionLevel: "L" | "M" | "Q" | "H";
  version: number;
  size: number;
  contentValue: string;
  onMarginChange: (margin: number) => void;
  onErrorCorrectionLevelChange: (level: "L" | "M" | "Q" | "H") => void;
  onVersionChange: (version: number) => void;
  onSizeChange: (size: number) => void;
}

export function AdvancedSettings({
  margin,
  errorCorrectionLevel,
  version,
  size,
  contentValue,
  onMarginChange,
  onErrorCorrectionLevelChange,
  onVersionChange,
  onSizeChange,
}: AdvancedSettingsProps) {
  const contentBytes = new TextEncoder().encode(contentValue).length;

  return (
    <div className="px-5 py-3 border-b border-slate-200">
      <div className="text-sm font-semibold text-slate-800">高级设置</div>
      <div className="mt-2 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3">
        <div>
          <label className="block text-sm text-slate-600 mb-1">码边距</label>
          <Select
            value={String(margin)}
            onValueChange={(value) => onMarginChange(Number(value))}
          >
            <SelectTrigger className="w-full h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 9 }).map((_, i) => (
                <SelectItem key={i} value={String(i)}>
                  {i}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">容错率</label>
          <Select
            value={errorCorrectionLevel}
            onValueChange={(value) =>
              onErrorCorrectionLevelChange(value as "L" | "M" | "Q" | "H")
            }
          >
            <SelectTrigger className="w-full h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="L">L (7%)</SelectItem>
              <SelectItem value="M">M (15%)</SelectItem>
              <SelectItem value="Q">Q (25%)</SelectItem>
              <SelectItem value="H">H (30%)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">码版本</label>
          <Select
            value={String(version || 3)}
            onValueChange={(value) => onVersionChange(Number(value))}
          >
            <SelectTrigger className="w-full h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 40 }).map((_, i) => {
                const v = i + 1;
                const modules = 21 + (v - 1) * 4;
                const capacity = BYTE_CAPACITY[errorCorrectionLevel][i];
                const isInsufficient = capacity < contentBytes;
                return (
                  <SelectItem
                    key={v}
                    value={String(v)}
                    disabled={isInsufficient}
                    title={
                      isInsufficient
                        ? `当前内容需要 ${contentBytes} 字节，该版本仅支持 ${capacity} 字节`
                        : `最多可编码 ${capacity} 字节`
                    }
                  >
                    {v} ({modules}×{modules})
                    {isInsufficient ? " - 容量不足" : ""}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">导出尺寸</label>
          <Select
            value={String(size)}
            onValueChange={(value) => onSizeChange(Number(value))}
          >
            <SelectTrigger className="w-full h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[200, 240, 256, 288, 300, 320, 384, 448, 512].map((s) => (
                <SelectItem key={s} value={String(s)}>
                  {s}px
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

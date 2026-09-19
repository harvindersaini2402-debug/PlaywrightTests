import XLSX from 'xlsx';

export class ExcelHelper {
    static readExcel(filePath: string, sheetName?: string): Record<string, string>[] {
        const workbook = XLSX.readFile(filePath);
        const worksheet = workbook.Sheets[sheetName || workbook.SheetNames[0]];
        if (!worksheet) {
            throw new Error(`Sheet ${sheetName} not found in the Excel file.`);
        }
        return XLSX.utils.sheet_to_json<Record<string, string>>(worksheet);
    }
}
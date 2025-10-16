import { GoogleGenAI, Type } from "@google/genai";
import type { GenerateContentResponse } from "@google/genai";
import type { ParsedWorkLog, FinalPayrollOutput } from "../types";
import { 
    EMPLOYEE_ID_MAP,
    EMPLOYEE_PROJECT_MAP,
    EMPLOYEE_HOUR_CODE_MAP,
    HOUR_PRICE_MAP
} from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const payrollReportSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
        Fecha: { type: Type.STRING },
        'Cod. Empleado': { type: Type.STRING },
        'tipo de hora': { type: Type.STRING },
        unidades: { type: Type.NUMBER },
        precio: { type: Type.NUMBER },
        importe: { type: Type.NUMBER },
        obra: { type: Type.INTEGER },
        'centro de coste': { type: Type.INTEGER },
    },
    required: ['Fecha', 'Cod. Empleado', 'tipo de hora', 'unidades', 'precio', 'importe', 'obra', 'centro de coste'],
  }
};

export const generatePayrollReport = async (workLogs: ParsedWorkLog[]): Promise<FinalPayrollOutput[]> => {
  const prompt = `
    You are an expert HR payroll assistant for a Spanish construction company. Your task is to process a structured list of daily work logs and convert it into a final payroll import file in JSON format. You must use the provided data maps to enrich the data and apply the business rules precisely.

    **Data Maps (Context):**

    1.  **Employee ID Map (Name to Code):**
        ${JSON.stringify(EMPLOYEE_ID_MAP, null, 2)}

    2.  **Employee Project Map (Code to Obra ID):**
        ${JSON.stringify(EMPLOYEE_PROJECT_MAP, null, 2)}

    3.  **Employee Hour Code Map (Code to Hour Types):**
        ${JSON.stringify(EMPLOYEE_HOUR_CODE_MAP, null, 2)}

    4.  **Hour Price Map (Hour Type to Price):**
        ${JSON.stringify(HOUR_PRICE_MAP, null, 2)}

    **Business Rules:**

    1.  **Filtering:**
        *   IGNORE any log entry where 'isAbsence' is true.
        *   IGNORE any log entry where 'isMissing' is true.
        *   Only process entries with valid 'totalHours'.

    2.  **Data Lookup:**
        *   For each log, find the employee's code (e.g., "MAD2344") from the Employee ID Map using their name.
        *   Use this code to find their project/work ID ('obra') from the Employee Project Map. The 'centro de coste' is always the same as the 'obra'. If the project is 0, use a placeholder like 9999 for both.
        *   Use the employee code to find their specific set of hour codes (normal, extra, sabado, festivo) from the Employee Hour Code Map.

    3.  **Hour Calculation:**
        *   Convert the 'totalHours' string ("HH:mm") to a decimal number (e.g., "01:30" becomes 1.5).
        *   Apply rules based on the 'dayOfWeek':
            *   **'S' (Saturday):** All hours are overtime. Use the 'sabado' hour code for the employee.
            *   **'D' (Sunday/Festivo):** All hours are overtime. Use the 'festivo' hour code. (Assume no public holidays in data).
            *   **'L', 'M', 'X', 'J', 'V' (Monday-Friday):**
                *   The standard workday is 8 hours.
                *   If total decimal hours are > 8, you must create TWO output rows:
                    1.  One for normal hours with 'unidades' = 8.0. Use the 'normal' hour code.
                    2.  One for overtime hours with 'unidades' = (total hours - 8). Use the 'extra' hour code.
                *   If total decimal hours are <= 8, create ONE output row for normal hours with 'unidades' = total hours. Use the 'normal' hour code.

    4.  **Financial Calculation:**
        *   For each output row you generate, find the correct 'precio' from the Hour Price Map using the determined 'tipo de hora'.
        *   Calculate the 'importe' by multiplying 'unidades' by 'precio'. Round the 'importe' to two decimal places.

    5.  **Formatting:**
        *   The input date is "YYYY-MM-DD". You must format it to "DD/MM/YYYY" for the 'Fecha' field in the output.
        *   Ensure all numbers ('unidades', 'precio', 'importe') are standard numbers, not strings.

    **Input Data (Parsed Work Logs):**
    ${JSON.stringify(workLogs, null, 2)}

    Process this data according to all rules and return a single JSON array that strictly adheres to the provided schema. Each processed work log can result in one or two objects in the final array.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: payrollReportSchema,
      },
    });

    const text = response.text.trim();
    const result = JSON.parse(text);
    
    // Sort the results for consistency
    return result.sort((a: FinalPayrollOutput, b: FinalPayrollOutput) => {
        const aCode = a['Cod. Empleado'];
        const bCode = b['Cod. Empleado'];
        const aDate = a.Fecha.split('/').reverse().join('-');
        const bDate = b.Fecha.split('/').reverse().join('-');

        if (aCode < bCode) return -1;
        if (aCode > bCode) return 1;
        if (aDate < bDate) return -1;
        if (aDate > bDate) return 1;
        // Keep normal hours before overtime on the same day
        if (a['tipo de hora'].startsWith('HN')) return -1;
        if (b['tipo de hora'].startsWith('HN')) return 1;
        return 0;
    });

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate payroll report from AI.");
  }
};

const fs = require('fs');
const path = require('path');

const SOURCE_FILE = path.join(__dirname, '../../../PATIENT_CASE_LIBRARY.md');
const OUT_DIR = path.join(__dirname, '../data/cases');

// Helper to parse the simplified nested vitals in the markdown YAML
// e.g. blood_pressure: { systolic: 138, diastolic: 88 }
function parseYamlValue(line, key) {
    if (!line.includes(key)) return null;
    const val = line.split(':')[1].trim();
    return val;
}

function parseCase(rawText) {
    // 1. Extract ID
    const titleMatch = rawText.match(/## CASE (PC\d+): (.+)/);
    if (!titleMatch) return null;
    const id = titleMatch[1];
    const rawTitle = titleMatch[2].replace(/"/g, '').trim();

    // 2. Extract YAML Block for Vitals
    const yamlMatch = rawText.match(/```yaml([\s\S]*?)```/);
    if (!yamlMatch) return null;
    const yamlContent = yamlMatch[1];

    // Simple parsing of the interesting fields
    let name = rawTitle; // Default to title
    let description = "Patient Encounter";
    let hr = 80, bp_sys = 120, bp_dia = 80, o2 = 98, temp = 37, rr = 16;
    let age = 30, sex = "M";

    const lines = yamlContent.split('\n');
    lines.forEach(line => {
        if (line.includes('name:')) name = line.split('name:')[1].trim().replace(/"/g, '');
        if (line.includes('chief_complaint:')) description = line.split('chief_complaint:')[1].trim().replace(/"/g, '');
        if (line.includes('heart_rate:')) hr = parseInt(line.split(':')[1]);
        if (line.includes('systolic:')) bp_sys = parseInt(line.match(/systolic:\s*(\d+)/)[1]);
        if (line.includes('diastolic:')) bp_dia = parseInt(line.match(/diastolic:\s*(\d+)/)[1]);
        if (line.includes('oxygen_saturation:')) o2 = parseInt(line.split(':')[1]);
        if (line.includes('respiratory_rate:')) rr = parseInt(line.split(':')[1]);
        if (line.includes('temperature:')) temp = parseFloat(line.split(':')[1]);
        if (line.includes('age:')) age = parseInt(line.split(':')[1]);
        if (line.includes('sex:')) sex = line.split(':')[1].trim().replace(/"/g, '');
    });

    description = `${age}${sex}, ${description}`;

    // 3. Extract Narrative Sections
    // Implementation note: This is a rough heuristic. 
    // We grab text under "Presentation" or "The Setup" for the start node.
    let startText = "You enter the room.";
    const setupMatch = rawText.match(/### The Setup([\s\S]*?)###/);
    if (setupMatch) {
        // Clean up markdown quotes
        startText = setupMatch[1].replace(/>/g, '').trim().split('\n').filter(l => l.trim().length > 0).join('\n\n');
    }

    // 4. Construct the File Content
    const fileContent = `import { PatientCase } from '../../types/PatientCase';

const ${id}: PatientCase = {
    id: '${id}',
    title: '${name}',
    description: '${description.replace(/'/g, "\\'")}',
    difficulty: 'Medium',
    startNodeId: 'start',
    initialState: {
        vitals: {
            HR: ${hr}, BP_SYS: ${bp_sys}, BP_DIA: ${bp_dia}, O2: ${o2}, TEMP: ${temp}, RR: ${rr}, PAIN: 5
        },
        flags: [],
        inventory: [],
        history: [],
        stress: 0,
        timeElapsed: 0,
        relationships: {}
    },
    nodes: {
        'start': {
            id: 'start',
            text: \`${startText.replace(/`/g, '')}\`,
            options: [
                {
                    id: 'history',
                    text: 'Take History',
                    type: 'DIALOGUE',
                    nextNodeId: 'do_exam'
                },
                {
                    id: 'vitals',
                    text: 'Check Vitals',
                    type: 'MEDICAL',
                    nextNodeId: 'start'
                }
            ]
        },
        'do_exam': {
            id: 'do_exam',
            text: "You perform the physical exam. Findings are consistent with the presentation.",
            options: [
                {
                    id: 'diagnosis',
                    text: 'Make Diagnosis',
                    type: 'MEDICAL',
                    nextNodeId: 'win'
                }
            ]
        },
        'win': {
            id: 'win',
            text: "You correctly diagnosed and treated the patient. Good work.",
            options: [],
            isTerminal: true,
            onEnter: [{ type: 'WIN', description: 'Case Resolved' }]
        }
    }
};

export default ${id};`;

    return { id, content: fileContent };
}

function run() {
    console.log(`Reading from ${SOURCE_FILE}...`);
    if (!fs.existsSync(SOURCE_FILE)) {
        console.error("Source file not found!");
        return;
    }

    const rawData = fs.readFileSync(SOURCE_FILE, 'utf-8');
    const caseBlocks = rawData.split(/^## CASE /m).slice(1); // Skip header

    console.log(`Found ${caseBlocks.length} cases.`);

    caseBlocks.forEach(block => {
        // Re-add header for regex text
        const fullBlock = "## CASE " + block;
        const result = parseCase(fullBlock);

        if (result) {
            const outFile = path.join(OUT_DIR, `${result.id}.ts`);
            fs.writeFileSync(outFile, result.content);
            console.log(`Generated ${result.id}`);
        }
    });
}

run();

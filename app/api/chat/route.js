// app/api/chat/route.js
import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

export async function POST(req) {
    try {
        const body = await req.json();
        const { message } = body;

        // Get the project root directory (where package.json is located)
        const projectRoot = process.cwd();

        // Construct paths relative to project root
        const scriptPath = path.join(projectRoot, 'scripts', 'chatbot.py');
        const dataPath = path.join(projectRoot, 'data');

        console.log('Project root:', projectRoot);
        console.log('Script path:', scriptPath);
        console.log('Data path:', dataPath);

        return new Promise((resolve, reject) => {
            // Pass both message and data-dir arguments
            const pythonProcess = spawn('python', [
                scriptPath,
                '--message', message,
                '--data-dir', dataPath  // Add the data directory argument
            ]);

            let result = '';
            let errorOutput = '';

            pythonProcess.stdout.on('data', (data) => {
                console.log('Python stdout:', data.toString());
                result += data.toString();
            });

            pythonProcess.stderr.on('data', (data) => {
                console.log('Python stderr:', data.toString());
                errorOutput += data.toString();
            });

            pythonProcess.on('error', (error) => {
                console.error('Failed to start Python process:', error);
                resolve(NextResponse.json(
                    { error: 'Failed to start Python process', details: error.message },
                    { status: 500 }
                ));
            });

            pythonProcess.on('close', (code) => {
                console.log('Python process closed with code:', code);
                if (code !== 0) {
                    console.error('Python script error:', errorOutput);
                    resolve(NextResponse.json(
                        { error: 'Failed to process message', details: errorOutput },
                        { status: 500 }
                    ));
                    return;
                }

                try {
                    const response = JSON.parse(result);
                    resolve(NextResponse.json(response));
                } catch (e) {
                    console.error('JSON parsing error:', e);
                    resolve(NextResponse.json(
                        { error: 'Invalid response format', details: e.message },
                        { status: 500 }
                    ));
                }
            });
        });
    } catch (error) {
        console.error('Error in API route:', error);
        return NextResponse.json(
            { error: 'Internal server error', details: error.message },
            { status: 500 }
        );
    }
}
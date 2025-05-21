'use server'

export async function generateSchedulePDF(htmlContent: string): Promise<Blob> {
  const response = await fetch(`${process.env.API_URL}/schedules/pdf`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': process.env.API_KEY || '',
    },
    body: JSON.stringify({ htmlContent }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate PDF');
  }

  return response.blob();
}
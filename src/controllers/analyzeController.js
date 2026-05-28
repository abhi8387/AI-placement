const prisma = require("../lib/prisma");
const model = require("../services/aiService");

exports.analyzeResume = async (req, res) => {
  try {
    const { jobDescription } = req.body;

    const latestResume =
      await prisma.resume.findFirst({
        where: {
          userId: req.user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    if (!latestResume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    const prompt = `
You are an ATS resume analyzer.

Analyze this resume against the job description.

Resume:
${latestResume.content}

Job Description:
${jobDescription}

Return ONLY valid JSON in this format:

{
  "ats_score": number,
  "missing_skills": [],
  "strengths": [],
  "improvements": []
}
`;

    const completion =
        await model.chat.completions.create({
            model: "openai/gpt-4o-mini",
            messages: [
            {
                role: "user",
                content: prompt,
            },
            ],
        });

    const response =
        completion.choices[0].message.content;

    const parsedResponse = JSON.parse(response);

    res.status(200).json(parsedResponse);
    } catch (error) {
        res.status(500).json({
        error: error.message,
        });
  }
};
 export async function POST(req: Request) {

  try {

    const body = await req.json();

    const city =
      body.city || "";

    const disease =
      body.disease || "";

    const season =
      body.season || "";

    const medicine =
      body.medicine || "";

    const hospital =
      body.hospital || "";

    // --------------------
    // MAIN HEALTHCARE AI
    // --------------------

    let result = "";

    try {

      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${process.env.GROQ_API_KEY}`,
          },

          body: JSON.stringify({
            model:
              "llama-3.1-8b-instant",

            messages: [
              {
                role: "system",

                content:
                  "You are an advanced healthcare intelligence AI.",
              },

              {
                role: "user",

                content: `
                Analyze healthcare risk.

                City:
                ${city}

                Disease:
                ${disease}

                Season:
                ${season}

                Keep concise and professional.
                `,
              },
            ],
          }),
        }
      );

      const data =
        await response.json();

      result =
        data?.choices?.[0]
          ?.message?.content ||
        "Healthcare analysis unavailable.";

    } catch {

      result =
        "Healthcare AI unavailable.";
    }

    // --------------------
    // HOSPITAL AI
    // --------------------

    let hospitalData = null;

    let hospitalAI = "";

    if (hospital) {

      hospitalData = {
        hospital,

        occupancy:
          `${Math.floor(
            Math.random() * 20 + 70
          )}%`,

        oxygen: [
          "Stable",
          "Moderate",
          "Critical",
        ][
          Math.floor(
            Math.random() * 3
          )
        ],

        beds:
          Math.floor(
            Math.random() * 40 + 10
          ),
      };

      try {

        const hospitalReq =
          await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${process.env.GROQ_API_KEY}`,
              },

              body: JSON.stringify({
                model:
                  "llama-3.1-8b-instant",

                messages: [
                  {
                    role: "system",

                    content:
                      "You are an AI hospital infrastructure analyst.",
                  },

                  {
                    role: "user",

                    content: `
                    Analyze this hospital:
                    ${hospital}

                    Predict:
                    - ICU pressure
                    - oxygen demand
                    - healthcare stress
                    - emergency risk

                    Keep concise.
                    `,
                  },
                ],
              }),
            }
          );

        const hospitalRes =
          await hospitalReq.json();

        hospitalAI =
          hospitalRes?.choices?.[0]
            ?.message?.content ||
          "Hospital analysis unavailable.";

      } catch {

        hospitalAI =
          "Hospital analysis unavailable.";
      }
    }

    // --------------------
    // MEDICINE AI
    // --------------------

    let medicineData = null;

    let medicineAI = "";

    if (medicine) {

      medicineData = {
        medicine,

        vendor: [
          "Apollo Pharma",
          "NetMeds Supply",
          "MedPlus Logistics",
          "National Medical Supplier",
        ][
          Math.floor(
            Math.random() * 4
          )
        ],

        demand: [
          "LOW",
          "MEDIUM",
          "HIGH",
          "CRITICAL",
        ][
          Math.floor(
            Math.random() * 4
          )
        ],

        eta:
          `${Math.floor(
            Math.random() * 8 + 1
          )} Hours`,
      };

      try {

        const medicineReq =
          await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${process.env.GROQ_API_KEY}`,
              },

              body: JSON.stringify({
                model:
                  "llama-3.1-8b-instant",

                messages: [
                  {
                    role: "system",

                    content:
                      "You are an AI pharmaceutical supply analyst.",
                  },

                  {
                    role: "user",

                    content: `
                    Analyze this medicine:
                    ${medicine}

                    Predict:
                    - demand pressure
                    - shortage risk
                    - supply chain stress
                    - emergency demand

                    Keep concise.
                    `,
                  },
                ],
              }),
            }
          );

        const medicineRes =
          await medicineReq.json();

        medicineAI =
          medicineRes?.choices?.[0]
            ?.message?.content ||
          "Medicine analysis unavailable.";

      } catch {

        medicineAI =
          "Medicine analysis unavailable.";
      }
    }

    return Response.json({
      result,

      hospitalData,

      hospitalAI,

      medicineData,

      medicineAI,
    });

  } catch (error) {

    console.log(error);

    return Response.json({
      result:
        "Backend crashed.",

      hospitalData: null,

      hospitalAI: "",

      medicineData: null,

      medicineAI: "",
    });
  }
}
import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../utils/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query["slug"];

  if (!slug || typeof slug !== "string") {
    return res.status(404).json({ message: "invalid slug" });
  }

  const data = await prisma.shortLink.findFirst({
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  if (!data) {
    return res.status(404).json({ message: "slug not found" });
  }

  // res.status(200).json({ message: "hello" });
  return res.status(200).json(data);
};

export default handler;

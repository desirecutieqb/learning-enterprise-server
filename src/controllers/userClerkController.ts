import { Request, Response } from "express";
import { clerkClient } from "../index";

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;
  const userData = req.body;
  if (!userData || !userData.publicMetadata) {
    res.status(400).json({ message: "Invalid request: publicMetadata is required" });
    return;
  }
  try {
    const user = await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        userType: userData.publicMetadata.userType,
        settings: userData.publicMetadata.settings,
      },
    });

    res.json({ message: "User updated successfully", data: user });
  } catch (error: any) {
    console.error("Błąd podczas aktualizacji użytkownika:", error);
    res.status(500).json({ message: "Error updating user", error: error.message || error.toString() });
  }
};
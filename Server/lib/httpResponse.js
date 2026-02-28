export const ThrowConflictException = (res, message) => {
  return res.status(409).json({ message });
};

export const ThrowNotFoundException = (res, message) => {
  return res.status(404).json({ message });
};

export const ThrowBadRequestException = (res, message) => {
  return res.status(400).json({ message });
};
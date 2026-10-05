export const validate = (schema) => (req, res, next) => {
  try {
    const parsed = schema.parse(req.body);
    req.body = parsed;
    next();
  } catch (error) {
    const issueMessages = error.errors
      ? error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ')
      : error.message;

    return res.status(400).json({
      success: false,
      data: null,
      error: {
        message: `Validation error: ${issueMessages}`,
        details: error.errors,
      },
    });
  }
};

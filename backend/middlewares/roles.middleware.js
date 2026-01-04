export default rolPermitido => (req, res, next) => {
  if (req.user.rol !== rolPermitido)
    return res.sendStatus(403);
  next();
};


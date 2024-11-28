import jwt, { Secret } from 'jsonwebtoken';

export const generateJwtToken = ({ username, role }): string => {
    const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'hanno'};
    try {
        const SECRET_KEY: Secret = process.env.JWT_SECRET as Secret;
        return jwt.sign({ username, role }, SECRET_KEY, options);
    } catch (error) {
        console.log(error);
        throw new Error('Error generating JWT token, see server log for details.');
    }
}

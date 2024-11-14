// Execute: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { set } from 'date-fns';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.ballotParty.deleteMany();
    await prisma.voterBallot.deleteMany();
    await prisma.ballot.deleteMany();
    await prisma.voter.deleteMany();
    await prisma.partyCandidate.deleteMany();
    await prisma.candidate.deleteMany();
    await prisma.partyType.deleteMany();
    await prisma.party.deleteMany();
    await prisma.region.deleteMany();
    await prisma.type.deleteMany();

    const europeanType = await prisma.type.create({data: {name: 'european',},});
    const federalType = await prisma.type.create({data: {name: 'federal',},});
    const regionalType = await prisma.type.create({data: {name: 'regional',},});
    const provincialType = await prisma.type.create({data: {name: 'provincial',},});
    const municipalType = await prisma.type.create({data: {name: 'municipal',},});


};

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();
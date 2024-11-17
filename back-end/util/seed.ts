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
    await prisma.party.deleteMany();
    await prisma.region.deleteMany();
    await prisma.type.deleteMany();

    const typeEuropean = await prisma.type.create({data: {name: 'european',},});
    const typeNational = await prisma.type.create({data: {name: 'national',},});
    const typeRegional = await prisma.type.create({data: {name: 'regional',},});
    const typeProvincial = await prisma.type.create({data: {name: 'provincial',},});
    const typeMunicipal = await prisma.type.create({data: {name: 'municipal',},});

    const regionEurope = await prisma.region.create({data: { name: "European Union", type: { connect: { id: typeEuropean.id }}}});

    const regionBelgium = await prisma.region.create({data: { name: "Belgium", type: { connect: { id: typeNational.id }}, parent: { connect: { id: regionEurope.id}}}});

    const regionFlanders = await prisma.region.create({data: { name: "Flanders", type: { connect: { id: typeRegional.id }}, parent: { connect: { id: regionBelgium.id}}}});
    const regionWallonia = await prisma.region.create({data: { name: "Wallonia", type: { connect: { id: typeRegional.id }}, parent: { connect: { id: regionBelgium.id}}}});
    const regionBrussels = await prisma.region.create({data: { name: "Brussels", type: { connect: { id: typeRegional.id }}, parent: { connect: { id: regionBelgium.id}}}});

    const regionWestVlaanderen = await prisma.region.create({data: { name: "West Vlaanderen", type: { connect: { id: typeProvincial.id }}, parent: { connect: { id: regionFlanders.id}}}});
    const regionOostVlaanderen = await prisma.region.create({data: { name: "Oost Vlaanderen", type: { connect: { id: typeProvincial.id }}, parent: { connect: { id: regionFlanders.id}}}});
    const regionVlaamsBrabant = await prisma.region.create({data: { name: "Vlaams Brabant", type: { connect: { id: typeProvincial.id }}, parent: { connect: { id: regionFlanders.id}}}});
    const regionAntwerpen = await prisma.region.create({data: { name: "Antwerpen", type: { connect: { id: typeProvincial.id }}, parent: { connect: { id: regionFlanders.id}}}});
    const regionLimburg = await prisma.region.create({data: { name: "Limburg", type: { connect: { id: typeProvincial.id }}, parent: { connect: { id: regionFlanders.id}}}});
    const regionHainaut = await prisma.region.create({data: { name: "Hainaut", type: { connect: { id: typeProvincial.id }}, parent: { connect: { id: regionWallonia.id}}}});
    const regionNamur = await prisma.region.create({data: { name: "Namur", type: { connect: { id: typeProvincial.id }}, parent: { connect: { id: regionWallonia.id}}}});
    const regionBrabantWallon = await prisma.region.create({data: { name: "Brabant Wallon", type: { connect: { id: typeProvincial.id }}, parent: { connect: { id: regionWallonia.id}}}});
    const regionLiege = await prisma.region.create({data: { name: "Liège", type: { connect: { id: typeProvincial.id }}, parent: { connect: { id: regionWallonia.id}}}});
    const regionLuxemburg = await prisma.region.create({data: { name: "Luxembourg", type: { connect: { id: typeProvincial.id }}, parent: { connect: { id: regionWallonia.id}}}});
    
    const regionAntwerpenStad = await prisma.region.create({data: { name: "Antwerpen", type: { connect: { id: typeMunicipal.id }}, parent: { connect: { id: regionAntwerpen.id}}}});
    const regionGent = await prisma.region.create({data: { name: "Gent", type: { connect: { id: typeMunicipal.id }}, parent: { connect: { id: regionOostVlaanderen.id}}}});
    const regionLeuven = await prisma.region.create({data: { name: "Leuven", type: { connect: { id: typeMunicipal.id }}, parent: { connect: { id: regionVlaamsBrabant.id}}}});
    const regionHasselt = await prisma.region.create({data: { name: "Hasselt", type: { connect: { id: typeMunicipal.id }}, parent: { connect: { id: regionLimburg.id}}}});
    const regionHeers = await prisma.region.create({data: { name: "Heers", type: { connect: { id: typeMunicipal.id }}, parent: { connect: { id: regionLimburg.id}}}});
    const regionBrugge = await prisma.region.create({data: { name: "Brugge", type: { connect: { id: typeMunicipal.id }}, parent: { connect: { id: regionWestVlaanderen.id}}}});
    const regionMons = await prisma.region.create({data: { name: "Mons", type: { connect: { id: typeMunicipal.id }}, parent: { connect: { id: regionHainaut.id}}}});
    const regionLiegeCite = await prisma.region.create({data: { name: "Liège", type: { connect: { id: typeMunicipal.id }}, parent: { connect: { id: regionLiege.id}}}});
    const regionArlon = await prisma.region.create({data: { name: "Arlon", type: { connect: { id: typeMunicipal.id }}, parent: { connect: { id: regionLuxemburg.id}}}});
    const regionNamurCite = await prisma.region.create({data: { name: "Namur", type: { connect: { id: typeMunicipal.id }}, parent: { connect: { id: regionNamur.id}}}});
    const regionWavre = await prisma.region.create({data: { name: "Wavre", type: { connect: { id: typeMunicipal.id }}, parent: { connect: { id: regionBrabantWallon.id}}}});
    const regionBruxelles = await prisma.region.create({data: { name: "Bruxelles", type: { connect: { id: typeMunicipal.id }}, parent: { connect: { id: regionBrussels.id}}}});

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
// Execute: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { set } from 'date-fns';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.ballotParty.deleteMany();
    await prisma.voterBallot.deleteMany();
    await prisma.ballot.deleteMany();
    await prisma.user.deleteMany();
    await prisma.partyCandidate.deleteMany();
    await prisma.candidate.deleteMany();
    await prisma.party.deleteMany();
    await prisma.region.deleteMany();
    await prisma.type.deleteMany();

    const typeNational = await prisma.type.create({ data: { name: 'national' } });
    const typeRegional = await prisma.type.create({ data: { name: 'regional' } });
    const typeProvincial = await prisma.type.create({ data: { name: 'provincial' } });
    const typeMunicipal = await prisma.type.create({ data: { name: 'municipal' } });

    const regionMallia = await prisma.region.create({
        data: {
            name: 'Mallia',
            type: { connect: { id: typeNational.id } }
        },
    });

    const regionFlaumassin = await prisma.region.create({
        data: {
            name: 'Flaumassin',
            type: { connect: { id: typeRegional.id } },
            parent: { connect: { id: regionMallia.id } },
        },
    });
    const regionWalinnie = await prisma.region.create({
        data: {
            name: 'Walinnie',
            type: { connect: { id: typeRegional.id } },
            parent: { connect: { id: regionMallia.id } },
        },
    });
    const regionBrussels = await prisma.region.create({
        data: {
            name: 'Brussels',
            type: { connect: { id: typeRegional.id } },
            parent: { connect: { id: regionMallia.id } },
        },
    });

    const regionWessFlaumassinne = await prisma.region.create({
        data: {
            name: 'Wess Flaumassinne',
            type: { connect: { id: typeProvincial.id } },
            parent: { connect: { id: regionFlaumassin.id } },
        },
    });
    const regionAustFlaumassinne = await prisma.region.create({
        data: {
            name: 'Aust Flaumassinne',
            type: { connect: { id: typeProvincial.id } },
            parent: { connect: { id: regionFlaumassin.id } },
        },
    });
    const regionFlaumsBrabant = await prisma.region.create({
        data: {
            name: 'Flaums Brabant',
            type: { connect: { id: typeProvincial.id } },
            parent: { connect: { id: regionFlaumassin.id } },
        },
    });
    const regionAntwerpen = await prisma.region.create({
        data: {
            name: 'Antwerpen',
            type: { connect: { id: typeProvincial.id } },
            parent: { connect: { id: regionFlaumassin.id } },
        },
    });
    const regionLimburg = await prisma.region.create({
        data: {
            name: 'Limburg',
            type: { connect: { id: typeProvincial.id } },
            parent: { connect: { id: regionFlaumassin.id } },
        },
    });
    const regionHainaut = await prisma.region.create({
        data: {
            name: 'Hainaut',
            type: { connect: { id: typeProvincial.id } },
            parent: { connect: { id: regionWalinnie.id } },
        },
    });
    const regionNamur = await prisma.region.create({
        data: {
            name: 'Namur',
            type: { connect: { id: typeProvincial.id } },
            parent: { connect: { id: regionWalinnie.id } },
        },
    });
    const regionBrabantWalinn = await prisma.region.create({
        data: {
            name: 'Brabant Walinn',
            type: { connect: { id: typeProvincial.id } },
            parent: { connect: { id: regionWalinnie.id } },
        },
    });
    const regionLiege = await prisma.region.create({
        data: {
            name: 'Liège',
            type: { connect: { id: typeProvincial.id } },
            parent: { connect: { id: regionWalinnie.id } },
        },
    });
    const regionLuxemburg = await prisma.region.create({
        data: {
            name: 'Luxembourg',
            type: { connect: { id: typeProvincial.id } },
            parent: { connect: { id: regionWalinnie.id } },
        },
    });

    const regionAntwerpenStad = await prisma.region.create({
        data: {
            name: 'Antwerpen',
            type: { connect: { id: typeMunicipal.id } },
            parent: { connect: { id: regionAntwerpen.id } },
        },
    });
    const regionGent = await prisma.region.create({
        data: {
            name: 'Gent',
            type: { connect: { id: typeMunicipal.id } },
            parent: { connect: { id: regionAustFlaumassinne.id } },
        },
    });
    const regionLeuven = await prisma.region.create({
        data: {
            name: 'Leuven',
            type: { connect: { id: typeMunicipal.id } },
            parent: { connect: { id: regionFlaumsBrabant.id } },
        },
    });
    const regionHasselt = await prisma.region.create({
        data: {
            name: 'Hasselt',
            type: { connect: { id: typeMunicipal.id } },
            parent: { connect: { id: regionLimburg.id } },
        },
    });
    const regionBrugge = await prisma.region.create({
        data: {
            name: 'Brugge',
            type: { connect: { id: typeMunicipal.id } },
            parent: { connect: { id: regionWessFlaumassinne.id } },
        },
    });
    const regionMons = await prisma.region.create({
        data: {
            name: 'Mons',
            type: { connect: { id: typeMunicipal.id } },
            parent: { connect: { id: regionHainaut.id } },
        },
    });
    const regionLiegeCite = await prisma.region.create({
        data: {
            name: 'Liège',
            type: { connect: { id: typeMunicipal.id } },
            parent: { connect: { id: regionLiege.id } },
        },
    });
    const regionArlon = await prisma.region.create({
        data: {
            name: 'Arlon',
            type: { connect: { id: typeMunicipal.id } },
            parent: { connect: { id: regionLuxemburg.id } },
        },
    });
    const regionNamurCite = await prisma.region.create({
        data: {
            name: 'Namur',
            type: { connect: { id: typeMunicipal.id } },
            parent: { connect: { id: regionNamur.id } },
        },
    });
    const regionWavre = await prisma.region.create({
        data: {
            name: 'Wavre',
            type: { connect: { id: typeMunicipal.id } },
            parent: { connect: { id: regionBrabantWalinn.id } },
        },
    });
    const regionBruxelles = await prisma.region.create({
        data: {
            name: 'Bruxelles',
            type: { connect: { id: typeMunicipal.id } },
            parent: { connect: { id: regionBrussels.id } },
        },
    });

    const userAdmin = await prisma.user.create({
        data: {
            username: 'testadmin',
            name: 'Admi Strator', // Administrator
            email: 'admin@hanno.localhost',
            password: await bcrypt.hash('admin', 12),
            role: 'admin',
            location: { connect: { id: regionLeuven.id } },
        },
    });

    const userManager = await prisma.user.create({
        data: {
            username: 'testmanager',
            name: 'Mode Strator', // Moderator
            email: 'mod@hanno.localhost',
            password: await bcrypt.hash('manager', 12),
            role: 'manager',
            location: { connect: { id: regionWavre.id } },
        },
    });

    const userVoter = await prisma.user.create({
        data: {
            username: 'testvoter',
            name: 'Regi Strator', // Registrator
            email: 'regi@hanno.localhost',
            password: await bcrypt.hash('voter', 12),
            role: 'voter',
            location: { connect: { id: regionBruxelles.id } },
        },
    });

    const partyNationalTesters = await prisma.party.create({
        data: {
            name: 'Party en Testing',
            abbr: 'PET',
            logo: 'https://board.icosahedr.online/_images/624050a46014f7b5cb4a78ef20eec3fa/399%20-%20logo%20series%3ATestImages.png',
            type: { connect: { id: typeNational.id }},
        }
    });

    const candidateQuinn = await prisma.candidate.create({
        data: {
            name: 'Quinn',
            location: { connect: { id: regionNamurCite.id }},
        }
    });

    const partyCandidateNationalQuinn = await prisma.partyCandidate.create({
        data: {
            candidate: { connect: {id: candidateQuinn.id }},
            party: {connect: {id: partyNationalTesters.id }}
        }
    })

    const partyNationalYappers = await prisma.party.create({
        data: {
            name: 'Full, Open and Public Everyevery Syndicated Party of Yappers',
            abbr: 'FOPESPY',
            logo: 'https://board.icosahedr.online/_images/982da7706f7621303f817c29d7440916/370%20-%20artist%3Asapero%20digital_art%20FOPESPY%20logo.png',
            type: { connect: { id: typeNational.id }},
        }
    });

    const candidateIke = await prisma.candidate.create({
        data: {
            name: 'Ike',
            location: { connect: { id: regionLeuven.id }},
        }
    });

    const partyCandidateNationalIke = await prisma.partyCandidate.create({
        data: {
            candidate: { connect: {id: candidateIke.id }},
            party: {connect: {id: partyNationalYappers.id }},
            position: 20
        }
    });

    const partyNationalWWW = await prisma.party.create({
        data: {
            name: 'Worldwide Wakened Wutualists',
            abbr: 'WWW',
            logo: 'https://board.icosahedr.online/_images/f54873511e11da904d10a91e230262f3/328%20-%20artist%3Asapero%20digital_art%20logo%20Worldwide_Wakened_Wutualists.png',
            type: { connect: { id: typeNational.id }},
        }
    });

    const candidateReggie = await prisma.candidate.create({
        data: {
            name: 'Reggie',
            location: { connect: { id: regionLeuven.id }},
        }
    });

    const partyCandidateNationalReggie = await prisma.partyCandidate.create({
        data: {
            candidate: { connect: {id: candidateReggie.id }},
            party: {connect: {id: partyNationalWWW.id }}
        }
    });

    const ballotMallia = await prisma.ballot.create({
        data: {
            name: 'National Mallian Elections',
            system: 'fptp',
            minimum: 0,
            maximum: 1,
            location: {connect: {id: regionMallia.id}}
        }
    });
    
    const ballotPartyMallianPET = await prisma.ballotParty.create({
        data: {
            ballot: { connect: {id: ballotMallia.id }},
            party: {connect: {id: partyNationalTesters.id }}
        }
    });
    
    const ballotPartyMallianWWW = await prisma.ballotParty.create({
        data: {
            ballot: { connect: {id: ballotMallia.id }},
            party: {connect: {id: partyNationalWWW.id }}
        }
    });
    
    const ballotPartyMallianYappers = await prisma.ballotParty.create({
        data: {
            ballot: { connect: {id: ballotMallia.id }},
            party: {connect: {id: partyNationalYappers.id }}
        }
    });

    const partyRegionalWWW = await prisma.party.create({
        data: {
            name: 'Worldwide Wakened Wutualists',
            abbr: 'WWW',
            logo: 'https://board.icosahedr.online/_images/f54873511e11da904d10a91e230262f3/328%20-%20artist%3Asapero%20digital_art%20logo%20Worldwide_Wakened_Wutualists.png',
            type: { connect: { id: typeRegional.id }},
        }
    });

    const partyRegionalYappers = await prisma.party.create({
        data: {
            name: 'Full, Open and Public Everyevery Syndicated Party of Yappers',
            abbr: 'FOPESPY',
            logo: 'https://board.icosahedr.online/_images/982da7706f7621303f817c29d7440916/370%20-%20artist%3Asapero%20digital_art%20FOPESPY%20logo.png',
            type: { connect: { id: typeRegional.id }},
        }
    });

    const partyCandidateRegionalIke = await prisma.partyCandidate.create({
        data: {
            candidate: { connect: {id: candidateIke.id }},
            party: {connect: {id: partyRegionalYappers.id }},
            position: 20
        }
    });

    const partyCandidateRegionalReggie = await prisma.partyCandidate.create({
        data: {
            candidate: { connect: {id: candidateReggie.id }},
            party: {connect: {id: partyRegionalWWW.id }}
        }
    });

    const ballotFlaumassin = await prisma.ballot.create({
        data: {
            name: 'Regional Flaumassinne Elections',
            system: 'approval',
            minimum: 0,
            maximum: -1,
            location: {connect: {id: regionFlaumassin.id}}
        }
    });
    
    const ballotPartyballotFlaumassinWWW = await prisma.ballotParty.create({
        data: {
            ballot: { connect: {id: ballotFlaumassin.id }},
            party: {connect: {id: partyRegionalWWW.id }}
        }
    });
    
    const ballotPartyFlaumassinYappers = await prisma.ballotParty.create({
        data: {
            ballot: { connect: {id: ballotFlaumassin.id }},
            party: {connect: {id: partyRegionalYappers.id }}
        }
    });
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

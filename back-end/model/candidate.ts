// import { DomainError } from '../types/error';
// import { Region } from './region';
// import {
//     Candidate as CandidatePrisma,
//     Region as RegionPrisma,
//     Type as TypePrisma,
// } from '@prisma/client';

// export class Candidate {
//     readonly id?: number;
//     readonly name: string;
//     readonly location: Region;

//     constructor(candidate: { name: string; location: Region; id?: number }) {
//         this.validate(candidate);
//         this.id = candidate.id;
//         this.name = candidate.name;
//         this.location = candidate.location;
//     }

//     validate(candidate: { name: string }): void {
//         if (candidate.name.trim() == '') {
//             throw new DomainError('Name cannot be empty');
//         }
//     }

//     equals(candidate: Candidate): boolean {
//         return (
//             this.id === candidate.id &&
//             this.name === candidate.name &&
//             this.location === candidate.location
//         );
//     }

//     static from(
//         data: CandidatePrisma & { location: RegionPrisma & { type: TypePrisma } }
//     ): Candidate {
//         return new Candidate({
//             id: data.id,
//             name: data.name,
//             location: Region.from(data.location),
//         });
//     }
// }


import { prismaClient } from "../index.ts";

const USER_ID = "99";

async function seed() {
    await prismaClient.user.create({
        data: {
            id: USER_ID,
            email: "test@test.com"
        }
    })

    const website = await prismaClient.website.create({
        data: {
            url: "https://test.com",
            userId: USER_ID
        }
    })

    const validator = await prismaClient.validator.create({
        data: {
            publicKey: "0x12341223123",
            location: "Delhi",
            ip: "127.0.0.1",
        }
    })

    await prismaClient.websiteTicks.create({
        data: {
            websiteId: website.id,
            status: "Good",
            createdAt: new Date(),
            latency: 100,
            validatorId: validator.id
        }
    })

    await prismaClient.websiteTicks.create({
        data: {
            websiteId: website.id,
            status: "Good",
            createdAt: new Date(Date.now() - 1000 * 60 *10),
            latency: 100,
            validatorId: validator.id
        }
    })

    await prismaClient.websiteTicks.create({
        data: {
            websiteId: website.id,
            status: "Bad",
            createdAt: new Date(Date.now() - 1000 * 60 * 20),
            latency: 100,
            validatorId: validator.id
        }
    })
}

seed();
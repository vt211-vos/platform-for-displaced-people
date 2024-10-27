import {
  City,
  Coordinate,
  DisplacedGroup,
  GroupMember,
  House, Prisma,
  PrismaClient,
  Privilege,
  Review,
  User
} from "@prisma/client";
import {fakerUK as f} from "@faker-js/faker"
import {UserRole} from "../src/enums/users";
import {GroupStatus} from "../src/enums/group";
import {randomUUID} from "crypto"

const prisma = new PrismaClient();

type Seed<T extends { id: string }> = (Partial<T> & { id: string })[]

const cities = [
  {
    id: randomUUID(),
    name: "Житомир"
  },
  {
    id: randomUUID(),
    name: "Київ",
  },
  {
    id: randomUUID(),
    name: "Львів"
  },
  {
    id: randomUUID(),
    name: "Полтава"
  }
] satisfies Seed<City>

const coordinates = [
  // Zhytomyr
  {
    id: randomUUID(),
    longitude: 50.318517112094035,
    latitude: 29.059537181340147
  },
  {
    id: randomUUID(),
    longitude: 50.715436494083875,
    latitude: 28.02694697137687
  },
  // Kyiv
  {
    id: randomUUID(),
    longitude: 50.47421503784355,
    latitude: 30.478869705572034
  },
  {
    id: randomUUID(),
    longitude: 50.46898078076231,
    latitude: 30.62578731255179
  },
  // Lviv
  {
    id: randomUUID(),
    longitude: 49.83237110189718,
    latitude: 24.03053440394559
  }

] satisfies Seed<Coordinate>

const users = [
  {
    id: randomUUID(),
    name: f.person.fullName(),
    email: f.internet.email(),
    password: "password123",
    role: UserRole.ADMIN,
    phone: f.phone.number(),
  },
  {
    id: randomUUID(),
    name: f.person.fullName(),
    email: f.internet.email(),
    password: "password123",
    role: UserRole.VOLUNTEER,
    phone: f.phone.number(),
  },
  {
    id: randomUUID(),
    name: f.person.fullName(),
    email: f.internet.email(),
    password: "password123",
    role: UserRole.USER,
    phone: f.phone.number(),
  },
  {
    id: randomUUID(),
    name: f.person.fullName(),
    email: f.internet.email(),
    password: "password123",
    role: UserRole.USER,
    phone: f.phone.number(),
  },
] satisfies Seed<User>

const houses = [
  {
    id: randomUUID(),
    adress: f.location.streetAddress(),
    numPlaces: f.number.int({min: 1, max: 5}),
    details: f.lorem.paragraph(),
    cityId: cities[0].id,
    coordinateId: coordinates[0].id,
  },
  {
    id: randomUUID(),
    adress: f.location.streetAddress(),
    numPlaces: f.number.int({min: 1, max: 5}),
    details: f.lorem.paragraph(),
    cityId: cities[0].id,
    coordinateId: coordinates[1].id,
  },
  {
    id: randomUUID(),
    adress: f.location.streetAddress(),
    numPlaces: f.number.int({min: 1, max: 5}),
    details: f.lorem.paragraph(),
    cityId: cities[1].id,
    coordinateId: coordinates[2].id,
  },
  {
    id: randomUUID(),
    adress: f.location.streetAddress(),
    numPlaces: f.number.int({min: 1, max: 5}),
    details: f.lorem.paragraph(),
    cityId: cities[2].id,
    coordinateId: coordinates[4].id,
  },
] satisfies Seed<House>

const reviews = [
  {
    id: randomUUID(),
    userId: users[2].id,
    rate: f.number.int({min: 1, max: 5}),
    text: f.lorem.text(),
    houseId: houses[0].id,
  },
  {
    id: randomUUID(),
    userId: users[2].id,
    rate: f.number.int({min: 1, max: 5}),
    text: f.lorem.text(),
    houseId: houses[1].id,
  },
  {
    id: randomUUID(),
    userId: users[1].id,
    rate: f.number.int({min: 1, max: 5}),
    text: f.lorem.text(),
    houseId: houses[1].id,
  },
  {
    id: randomUUID(),
    userId: users[1].id,
    rate: f.number.int({min: 1, max: 5}),
    text: f.lorem.text(),
    houseId: houses[0].id,
  },
] satisfies Seed<Review>

const privileges = [
  {
    id: randomUUID(),
    name: "Родина з дітьми",
  },
  {
    id: randomUUID(),
    name: "Є люди похилого віку"
  },
  {
    id: randomUUID(),
    name: "Є поранені"
  }
] satisfies Seed<Privilege>

const displacedGroups = [
  {
    id: randomUUID(),
    status: GroupStatus.AVAILABLE,
    userId: users[2].id,
  },
  {
    id: randomUUID(),
    status: GroupStatus.NOT_AVAILABLE,
    userId: users[3].id,
  }
] satisfies Seed<DisplacedGroup>

const groupMembers = [
  {
    id: randomUUID(),
    name: f.person.firstName(),
    surname: f.person.lastName(),
    middleName: f.person.middleName(),
    age: f.number.int({min: 1, max: 80}),
    displacedGroupId: displacedGroups[0].id
  },
  {
    id: randomUUID(),
    name: f.person.firstName(),
    surname: f.person.lastName(),
    middleName: f.person.middleName(),
    age: f.number.int({min: 1, max: 80}),
    displacedGroupId: displacedGroups[0].id
  },
  {
    id: randomUUID(),
    name: f.person.firstName(),
    surname: f.person.lastName(),
    middleName: f.person.middleName(),
    age: f.number.int({min: 1, max: 80}),
    displacedGroupId: displacedGroups[0].id
  },
  {
    id: randomUUID(),
    name: f.person.firstName(),
    surname: f.person.lastName(),
    middleName: f.person.middleName(),
    age: f.number.int({min: 1, max: 80}),
    displacedGroupId: displacedGroups[1].id
  },
  {
    id: randomUUID(),
    name: f.person.firstName(),
    surname: f.person.lastName(),
    middleName: f.person.middleName(),
    age: f.number.int({min: 1, max: 80}),
    displacedGroupId: displacedGroups[1].id
  },
] satisfies Seed<GroupMember>

async function truncateDb() {
  const modelNames = Prisma.dmmf.datamodel.models
  for (const {name} of modelNames) {
    // @ts-ignore
    await prisma[name].deleteMany()
  }
}

async function main() {
  await truncateDb()

  for (const data of coordinates) {
    await prisma.coordinate.create({data})
  }

  for (const data of cities) {
    await prisma.city.create({data});
  }

  for (const data of users) {
    await prisma.user.create({data});
  }

  for (const data of houses) {
    await prisma.house.create({data})
  }

  for (const data of reviews) {
    await prisma.review.create({data})
  }

  for (const data of privileges) {
    await prisma.privilege.create({data})
  }

  for (const data of displacedGroups) {
    await prisma.displacedGroup.create({data})
  }

  for (const data of groupMembers) {
    await prisma.groupMember.create({data})
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

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

const prisma = new PrismaClient();

type Seed<T extends { id: number }> = (Partial<T> & { id: number })[]

const cities = [
  {
    id: 1,
    name: "Житомир"
  },
  {
    id: 2,
    name: "Київ",
  },
  {
    id: 3,
    name: "Львів"
  },
  {
    id: 4,
    name: "Полтава"
  }
] satisfies Seed<City>

const coordinates = [
  // Zhytomyr
  {
    id: 1,
    longitude: 50.318517112094035,
    latitude: 29.059537181340147
  },
  {
    id: 2,
    longitude: 50.715436494083875,
    latitude: 28.02694697137687
  },
  // Kyiv
  {
    id: 3,
    longitude: 50.47421503784355,
    latitude: 30.478869705572034
  },
  {
    id: 4,
    longitude: 50.46898078076231,
    latitude: 30.62578731255179
  },
  // Lviv
  {
    id: 5,
    longitude: 49.83237110189718,
    latitude: 24.03053440394559
  }

] satisfies Seed<Coordinate>

const users = [
  {
    id: 1,
    name: f.person.fullName(),
    email: f.internet.email(),
    password: "password123",
    role: UserRole.ADMIN,
    phone: f.phone.number(),
  },
  {
    id: 2,
    name: f.person.fullName(),
    email: f.internet.email(),
    password: "password123",
    role: UserRole.VOLUNTEER,
    phone: f.phone.number(),
  },
  {
    id: 3,
    name: f.person.fullName(),
    email: f.internet.email(),
    password: "password123",
    role: UserRole.USER,
    phone: f.phone.number(),
  },
  {
    id: 4,
    name: f.person.fullName(),
    email: f.internet.email(),
    password: "password123",
    role: UserRole.USER,
    phone: f.phone.number(),
  },
] satisfies Seed<User>

const houses = [
  {
    id: 1,
    adress: f.location.streetAddress(),
    numPlaces: f.number.int({min: 1, max: 5}),
    details: f.lorem.paragraph(),
    cityId: cities[0].id,
    coordinateId: coordinates[0].id,
  },
  {
    id: 2,
    adress: f.location.streetAddress(),
    numPlaces: f.number.int({min: 1, max: 5}),
    details: f.lorem.paragraph(),
    cityId: cities[0].id,
    coordinateId: coordinates[1].id,
  },
  {
    id: 3,
    adress: f.location.streetAddress(),
    numPlaces: f.number.int({min: 1, max: 5}),
    details: f.lorem.paragraph(),
    cityId: cities[1].id,
    coordinateId: coordinates[2].id,
  },
  {
    id: 4,
    adress: f.location.streetAddress(),
    numPlaces: f.number.int({min: 1, max: 5}),
    details: f.lorem.paragraph(),
    cityId: cities[2].id,
    coordinateId: coordinates[4].id,
  },
] satisfies Seed<House>

const reviews = [
  {
    id: 1,
    userId: users[2].id,
    rate: f.number.int({min: 1, max: 5}),
    text: f.lorem.text(),
    houseId: houses[0].id,
  },
  {
    id: 2,
    userId: users[2].id,
    rate: f.number.int({min: 1, max: 5}),
    text: f.lorem.text(),
    houseId: houses[1].id,
  },
  {
    id: 3,
    userId: users[1].id,
    rate: f.number.int({min: 1, max: 5}),
    text: f.lorem.text(),
    houseId: houses[1].id,
  },
  {
    id: 4,
    userId: users[1].id,
    rate: f.number.int({min: 1, max: 5}),
    text: f.lorem.text(),
    houseId: houses[0].id,
  },
] satisfies Seed<Review>

const privileges = [
  {
    id: 1,
    name: "Родина з дітьми",
  },
  {
    id: 2,
    name: "Є люди похилого віку"
  },
  {
    id: 3,
    name: "Є поранені"
  }
] satisfies Seed<Privilege>

const displacedGroups = [
  {
    id: 1,
    status: GroupStatus.AVAILABLE,
    userId: users[2].id,
  },
  {
    id: 2,
    status: GroupStatus.NOT_AVAILABLE,
    userId: users[3].id,
  }
] satisfies Seed<DisplacedGroup>

const groupMembers = [
  {
    id: 1,
    name: f.person.firstName(),
    surname: f.person.lastName(),
    middleName: f.person.middleName(),
    age: f.number.int({min: 1, max: 80}),
    displacedGroupId: displacedGroups[0].id
  },
  {
    id: 2,
    name: f.person.firstName(),
    surname: f.person.lastName(),
    middleName: f.person.middleName(),
    age: f.number.int({min: 1, max: 80}),
    displacedGroupId: displacedGroups[0].id
  },
  {
    id: 3,
    name: f.person.firstName(),
    surname: f.person.lastName(),
    middleName: f.person.middleName(),
    age: f.number.int({min: 1, max: 80}),
    displacedGroupId: displacedGroups[0].id
  },
  {
    id: 4,
    name: f.person.firstName(),
    surname: f.person.lastName(),
    middleName: f.person.middleName(),
    age: f.number.int({min: 1, max: 80}),
    displacedGroupId: displacedGroups[1].id
  },
  {
    id: 5,
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

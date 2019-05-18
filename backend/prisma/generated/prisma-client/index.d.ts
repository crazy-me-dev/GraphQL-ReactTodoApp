// Code generated by Prisma (prisma@1.32.2). DO NOT EDIT.
// Please don't change this file manually but run `prisma generate` to update it.
// For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

import { DocumentNode } from "graphql";
import {
  makePrismaClientClass,
  BaseClientOptions,
  Model
} from "prisma-client-lib";
import { typeDefs } from "./prisma-schema";

export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];

export type Maybe<T> = T | undefined | null;

export interface Exists {
  project: (where?: ProjectWhereInput) => Promise<boolean>;
  task: (where?: TaskWhereInput) => Promise<boolean>;
  user: (where?: UserWhereInput) => Promise<boolean>;
}

export interface Node {}

export type FragmentableArray<T> = Promise<Array<T>> & Fragmentable;

export interface Fragmentable {
  $fragment<T>(fragment: string | DocumentNode): Promise<T>;
}

export interface Prisma {
  $exists: Exists;
  $graphql: <T = any>(
    query: string,
    variables?: { [key: string]: any }
  ) => Promise<T>;

  /**
   * Queries
   */

  project: (where: ProjectWhereUniqueInput) => ProjectNullablePromise;
  projects: (args?: {
    where?: ProjectWhereInput;
    orderBy?: ProjectOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => FragmentableArray<Project>;
  projectsConnection: (args?: {
    where?: ProjectWhereInput;
    orderBy?: ProjectOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => ProjectConnectionPromise;
  task: (where: TaskWhereUniqueInput) => TaskNullablePromise;
  tasks: (args?: {
    where?: TaskWhereInput;
    orderBy?: TaskOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => FragmentableArray<Task>;
  tasksConnection: (args?: {
    where?: TaskWhereInput;
    orderBy?: TaskOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => TaskConnectionPromise;
  user: (where: UserWhereUniqueInput) => UserNullablePromise;
  users: (args?: {
    where?: UserWhereInput;
    orderBy?: UserOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => FragmentableArray<User>;
  usersConnection: (args?: {
    where?: UserWhereInput;
    orderBy?: UserOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => UserConnectionPromise;
  node: (args: { id: ID_Output }) => Node;

  /**
   * Mutations
   */

  createProject: (data: ProjectCreateInput) => ProjectPromise;
  updateProject: (args: {
    data: ProjectUpdateInput;
    where: ProjectWhereUniqueInput;
  }) => ProjectPromise;
  updateManyProjects: (args: {
    data: ProjectUpdateManyMutationInput;
    where?: ProjectWhereInput;
  }) => BatchPayloadPromise;
  upsertProject: (args: {
    where: ProjectWhereUniqueInput;
    create: ProjectCreateInput;
    update: ProjectUpdateInput;
  }) => ProjectPromise;
  deleteProject: (where: ProjectWhereUniqueInput) => ProjectPromise;
  deleteManyProjects: (where?: ProjectWhereInput) => BatchPayloadPromise;
  createTask: (data: TaskCreateInput) => TaskPromise;
  updateTask: (args: {
    data: TaskUpdateInput;
    where: TaskWhereUniqueInput;
  }) => TaskPromise;
  updateManyTasks: (args: {
    data: TaskUpdateManyMutationInput;
    where?: TaskWhereInput;
  }) => BatchPayloadPromise;
  upsertTask: (args: {
    where: TaskWhereUniqueInput;
    create: TaskCreateInput;
    update: TaskUpdateInput;
  }) => TaskPromise;
  deleteTask: (where: TaskWhereUniqueInput) => TaskPromise;
  deleteManyTasks: (where?: TaskWhereInput) => BatchPayloadPromise;
  createUser: (data: UserCreateInput) => UserPromise;
  updateUser: (args: {
    data: UserUpdateInput;
    where: UserWhereUniqueInput;
  }) => UserPromise;
  updateManyUsers: (args: {
    data: UserUpdateManyMutationInput;
    where?: UserWhereInput;
  }) => BatchPayloadPromise;
  upsertUser: (args: {
    where: UserWhereUniqueInput;
    create: UserCreateInput;
    update: UserUpdateInput;
  }) => UserPromise;
  deleteUser: (where: UserWhereUniqueInput) => UserPromise;
  deleteManyUsers: (where?: UserWhereInput) => BatchPayloadPromise;

  /**
   * Subscriptions
   */

  $subscribe: Subscription;
}

export interface Subscription {
  project: (
    where?: ProjectSubscriptionWhereInput
  ) => ProjectSubscriptionPayloadSubscription;
  task: (
    where?: TaskSubscriptionWhereInput
  ) => TaskSubscriptionPayloadSubscription;
  user: (
    where?: UserSubscriptionWhereInput
  ) => UserSubscriptionPayloadSubscription;
}

export interface ClientConstructor<T> {
  new (options?: BaseClientOptions): T;
}

/**
 * Types
 */

export type ProjectOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "name_ASC"
  | "name_DESC"
  | "updatedAt_ASC"
  | "updatedAt_DESC"
  | "createdAt_ASC"
  | "createdAt_DESC";

export type TaskOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "done_ASC"
  | "done_DESC"
  | "description_ASC"
  | "description_DESC"
  | "updatedAt_ASC"
  | "updatedAt_DESC"
  | "createdAt_ASC"
  | "createdAt_DESC";

export type UserOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "name_ASC"
  | "name_DESC"
  | "email_ASC"
  | "email_DESC"
  | "updatedAt_ASC"
  | "updatedAt_DESC"
  | "createdAt_ASC"
  | "createdAt_DESC";

export type MutationType = "CREATED" | "UPDATED" | "DELETED";

export interface TaskUpdateWithWhereUniqueWithoutProjectInput {
  where: TaskWhereUniqueInput;
  data: TaskUpdateWithoutProjectDataInput;
}

export type ProjectWhereUniqueInput = AtLeastOne<{
  id: Maybe<ID_Input>;
}>;

export interface TaskScalarWhereInput {
  id?: Maybe<ID_Input>;
  id_not?: Maybe<ID_Input>;
  id_in?: Maybe<ID_Input[] | ID_Input>;
  id_not_in?: Maybe<ID_Input[] | ID_Input>;
  id_lt?: Maybe<ID_Input>;
  id_lte?: Maybe<ID_Input>;
  id_gt?: Maybe<ID_Input>;
  id_gte?: Maybe<ID_Input>;
  id_contains?: Maybe<ID_Input>;
  id_not_contains?: Maybe<ID_Input>;
  id_starts_with?: Maybe<ID_Input>;
  id_not_starts_with?: Maybe<ID_Input>;
  id_ends_with?: Maybe<ID_Input>;
  id_not_ends_with?: Maybe<ID_Input>;
  done?: Maybe<Boolean>;
  done_not?: Maybe<Boolean>;
  description?: Maybe<String>;
  description_not?: Maybe<String>;
  description_in?: Maybe<String[] | String>;
  description_not_in?: Maybe<String[] | String>;
  description_lt?: Maybe<String>;
  description_lte?: Maybe<String>;
  description_gt?: Maybe<String>;
  description_gte?: Maybe<String>;
  description_contains?: Maybe<String>;
  description_not_contains?: Maybe<String>;
  description_starts_with?: Maybe<String>;
  description_not_starts_with?: Maybe<String>;
  description_ends_with?: Maybe<String>;
  description_not_ends_with?: Maybe<String>;
  updatedAt?: Maybe<DateTimeInput>;
  updatedAt_not?: Maybe<DateTimeInput>;
  updatedAt_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  updatedAt_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  updatedAt_lt?: Maybe<DateTimeInput>;
  updatedAt_lte?: Maybe<DateTimeInput>;
  updatedAt_gt?: Maybe<DateTimeInput>;
  updatedAt_gte?: Maybe<DateTimeInput>;
  createdAt?: Maybe<DateTimeInput>;
  createdAt_not?: Maybe<DateTimeInput>;
  createdAt_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  createdAt_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  createdAt_lt?: Maybe<DateTimeInput>;
  createdAt_lte?: Maybe<DateTimeInput>;
  createdAt_gt?: Maybe<DateTimeInput>;
  createdAt_gte?: Maybe<DateTimeInput>;
  AND?: Maybe<TaskScalarWhereInput[] | TaskScalarWhereInput>;
  OR?: Maybe<TaskScalarWhereInput[] | TaskScalarWhereInput>;
  NOT?: Maybe<TaskScalarWhereInput[] | TaskScalarWhereInput>;
}

export interface UserWhereInput {
  id?: Maybe<ID_Input>;
  id_not?: Maybe<ID_Input>;
  id_in?: Maybe<ID_Input[] | ID_Input>;
  id_not_in?: Maybe<ID_Input[] | ID_Input>;
  id_lt?: Maybe<ID_Input>;
  id_lte?: Maybe<ID_Input>;
  id_gt?: Maybe<ID_Input>;
  id_gte?: Maybe<ID_Input>;
  id_contains?: Maybe<ID_Input>;
  id_not_contains?: Maybe<ID_Input>;
  id_starts_with?: Maybe<ID_Input>;
  id_not_starts_with?: Maybe<ID_Input>;
  id_ends_with?: Maybe<ID_Input>;
  id_not_ends_with?: Maybe<ID_Input>;
  name?: Maybe<String>;
  name_not?: Maybe<String>;
  name_in?: Maybe<String[] | String>;
  name_not_in?: Maybe<String[] | String>;
  name_lt?: Maybe<String>;
  name_lte?: Maybe<String>;
  name_gt?: Maybe<String>;
  name_gte?: Maybe<String>;
  name_contains?: Maybe<String>;
  name_not_contains?: Maybe<String>;
  name_starts_with?: Maybe<String>;
  name_not_starts_with?: Maybe<String>;
  name_ends_with?: Maybe<String>;
  name_not_ends_with?: Maybe<String>;
  email?: Maybe<String>;
  email_not?: Maybe<String>;
  email_in?: Maybe<String[] | String>;
  email_not_in?: Maybe<String[] | String>;
  email_lt?: Maybe<String>;
  email_lte?: Maybe<String>;
  email_gt?: Maybe<String>;
  email_gte?: Maybe<String>;
  email_contains?: Maybe<String>;
  email_not_contains?: Maybe<String>;
  email_starts_with?: Maybe<String>;
  email_not_starts_with?: Maybe<String>;
  email_ends_with?: Maybe<String>;
  email_not_ends_with?: Maybe<String>;
  projects_every?: Maybe<ProjectWhereInput>;
  projects_some?: Maybe<ProjectWhereInput>;
  projects_none?: Maybe<ProjectWhereInput>;
  updatedAt?: Maybe<DateTimeInput>;
  updatedAt_not?: Maybe<DateTimeInput>;
  updatedAt_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  updatedAt_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  updatedAt_lt?: Maybe<DateTimeInput>;
  updatedAt_lte?: Maybe<DateTimeInput>;
  updatedAt_gt?: Maybe<DateTimeInput>;
  updatedAt_gte?: Maybe<DateTimeInput>;
  createdAt?: Maybe<DateTimeInput>;
  createdAt_not?: Maybe<DateTimeInput>;
  createdAt_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  createdAt_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  createdAt_lt?: Maybe<DateTimeInput>;
  createdAt_lte?: Maybe<DateTimeInput>;
  createdAt_gt?: Maybe<DateTimeInput>;
  createdAt_gte?: Maybe<DateTimeInput>;
  AND?: Maybe<UserWhereInput[] | UserWhereInput>;
  OR?: Maybe<UserWhereInput[] | UserWhereInput>;
  NOT?: Maybe<UserWhereInput[] | UserWhereInput>;
}

export interface TaskUpdateManyWithWhereNestedInput {
  where: TaskScalarWhereInput;
  data: TaskUpdateManyDataInput;
}

export interface TaskWhereInput {
  id?: Maybe<ID_Input>;
  id_not?: Maybe<ID_Input>;
  id_in?: Maybe<ID_Input[] | ID_Input>;
  id_not_in?: Maybe<ID_Input[] | ID_Input>;
  id_lt?: Maybe<ID_Input>;
  id_lte?: Maybe<ID_Input>;
  id_gt?: Maybe<ID_Input>;
  id_gte?: Maybe<ID_Input>;
  id_contains?: Maybe<ID_Input>;
  id_not_contains?: Maybe<ID_Input>;
  id_starts_with?: Maybe<ID_Input>;
  id_not_starts_with?: Maybe<ID_Input>;
  id_ends_with?: Maybe<ID_Input>;
  id_not_ends_with?: Maybe<ID_Input>;
  project?: Maybe<ProjectWhereInput>;
  done?: Maybe<Boolean>;
  done_not?: Maybe<Boolean>;
  description?: Maybe<String>;
  description_not?: Maybe<String>;
  description_in?: Maybe<String[] | String>;
  description_not_in?: Maybe<String[] | String>;
  description_lt?: Maybe<String>;
  description_lte?: Maybe<String>;
  description_gt?: Maybe<String>;
  description_gte?: Maybe<String>;
  description_contains?: Maybe<String>;
  description_not_contains?: Maybe<String>;
  description_starts_with?: Maybe<String>;
  description_not_starts_with?: Maybe<String>;
  description_ends_with?: Maybe<String>;
  description_not_ends_with?: Maybe<String>;
  updatedAt?: Maybe<DateTimeInput>;
  updatedAt_not?: Maybe<DateTimeInput>;
  updatedAt_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  updatedAt_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  updatedAt_lt?: Maybe<DateTimeInput>;
  updatedAt_lte?: Maybe<DateTimeInput>;
  updatedAt_gt?: Maybe<DateTimeInput>;
  updatedAt_gte?: Maybe<DateTimeInput>;
  createdAt?: Maybe<DateTimeInput>;
  createdAt_not?: Maybe<DateTimeInput>;
  createdAt_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  createdAt_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  createdAt_lt?: Maybe<DateTimeInput>;
  createdAt_lte?: Maybe<DateTimeInput>;
  createdAt_gt?: Maybe<DateTimeInput>;
  createdAt_gte?: Maybe<DateTimeInput>;
  AND?: Maybe<TaskWhereInput[] | TaskWhereInput>;
  OR?: Maybe<TaskWhereInput[] | TaskWhereInput>;
  NOT?: Maybe<TaskWhereInput[] | TaskWhereInput>;
}

export interface TaskUpdateManyDataInput {
  done?: Maybe<Boolean>;
  description?: Maybe<String>;
}

export interface ProjectWhereInput {
  id?: Maybe<ID_Input>;
  id_not?: Maybe<ID_Input>;
  id_in?: Maybe<ID_Input[] | ID_Input>;
  id_not_in?: Maybe<ID_Input[] | ID_Input>;
  id_lt?: Maybe<ID_Input>;
  id_lte?: Maybe<ID_Input>;
  id_gt?: Maybe<ID_Input>;
  id_gte?: Maybe<ID_Input>;
  id_contains?: Maybe<ID_Input>;
  id_not_contains?: Maybe<ID_Input>;
  id_starts_with?: Maybe<ID_Input>;
  id_not_starts_with?: Maybe<ID_Input>;
  id_ends_with?: Maybe<ID_Input>;
  id_not_ends_with?: Maybe<ID_Input>;
  name?: Maybe<String>;
  name_not?: Maybe<String>;
  name_in?: Maybe<String[] | String>;
  name_not_in?: Maybe<String[] | String>;
  name_lt?: Maybe<String>;
  name_lte?: Maybe<String>;
  name_gt?: Maybe<String>;
  name_gte?: Maybe<String>;
  name_contains?: Maybe<String>;
  name_not_contains?: Maybe<String>;
  name_starts_with?: Maybe<String>;
  name_not_starts_with?: Maybe<String>;
  name_ends_with?: Maybe<String>;
  name_not_ends_with?: Maybe<String>;
  user?: Maybe<UserWhereInput>;
  tasks_every?: Maybe<TaskWhereInput>;
  tasks_some?: Maybe<TaskWhereInput>;
  tasks_none?: Maybe<TaskWhereInput>;
  updatedAt?: Maybe<DateTimeInput>;
  updatedAt_not?: Maybe<DateTimeInput>;
  updatedAt_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  updatedAt_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  updatedAt_lt?: Maybe<DateTimeInput>;
  updatedAt_lte?: Maybe<DateTimeInput>;
  updatedAt_gt?: Maybe<DateTimeInput>;
  updatedAt_gte?: Maybe<DateTimeInput>;
  createdAt?: Maybe<DateTimeInput>;
  createdAt_not?: Maybe<DateTimeInput>;
  createdAt_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  createdAt_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  createdAt_lt?: Maybe<DateTimeInput>;
  createdAt_lte?: Maybe<DateTimeInput>;
  createdAt_gt?: Maybe<DateTimeInput>;
  createdAt_gte?: Maybe<DateTimeInput>;
  AND?: Maybe<ProjectWhereInput[] | ProjectWhereInput>;
  OR?: Maybe<ProjectWhereInput[] | ProjectWhereInput>;
  NOT?: Maybe<ProjectWhereInput[] | ProjectWhereInput>;
}

export interface TaskCreateWithoutProjectInput {
  done?: Maybe<Boolean>;
  description: String;
}

export interface ProjectUpdateOneRequiredWithoutTasksInput {
  create?: Maybe<ProjectCreateWithoutTasksInput>;
  update?: Maybe<ProjectUpdateWithoutTasksDataInput>;
  upsert?: Maybe<ProjectUpsertWithoutTasksInput>;
  connect?: Maybe<ProjectWhereUniqueInput>;
}

export interface ProjectUpdateInput {
  name?: Maybe<String>;
  user?: Maybe<UserUpdateOneRequiredWithoutProjectsInput>;
  tasks?: Maybe<TaskUpdateManyWithoutProjectInput>;
}

export interface ProjectUpdateManyMutationInput {
  name?: Maybe<String>;
}

export interface UserUpdateOneRequiredWithoutProjectsInput {
  create?: Maybe<UserCreateWithoutProjectsInput>;
  update?: Maybe<UserUpdateWithoutProjectsDataInput>;
  upsert?: Maybe<UserUpsertWithoutProjectsInput>;
  connect?: Maybe<UserWhereUniqueInput>;
}

export interface TaskSubscriptionWhereInput {
  mutation_in?: Maybe<MutationType[] | MutationType>;
  updatedFields_contains?: Maybe<String>;
  updatedFields_contains_every?: Maybe<String[] | String>;
  updatedFields_contains_some?: Maybe<String[] | String>;
  node?: Maybe<TaskWhereInput>;
  AND?: Maybe<TaskSubscriptionWhereInput[] | TaskSubscriptionWhereInput>;
  OR?: Maybe<TaskSubscriptionWhereInput[] | TaskSubscriptionWhereInput>;
  NOT?: Maybe<TaskSubscriptionWhereInput[] | TaskSubscriptionWhereInput>;
}

export interface UserUpdateWithoutProjectsDataInput {
  name?: Maybe<String>;
  email?: Maybe<String>;
}

export interface UserUpdateManyMutationInput {
  name?: Maybe<String>;
  email?: Maybe<String>;
}

export interface UserUpsertWithoutProjectsInput {
  update: UserUpdateWithoutProjectsDataInput;
  create: UserCreateWithoutProjectsInput;
}

export interface ProjectUpdateManyDataInput {
  name?: Maybe<String>;
}

export interface TaskUpdateManyWithoutProjectInput {
  create?: Maybe<
    TaskCreateWithoutProjectInput[] | TaskCreateWithoutProjectInput
  >;
  delete?: Maybe<TaskWhereUniqueInput[] | TaskWhereUniqueInput>;
  connect?: Maybe<TaskWhereUniqueInput[] | TaskWhereUniqueInput>;
  set?: Maybe<TaskWhereUniqueInput[] | TaskWhereUniqueInput>;
  disconnect?: Maybe<TaskWhereUniqueInput[] | TaskWhereUniqueInput>;
  update?: Maybe<
    | TaskUpdateWithWhereUniqueWithoutProjectInput[]
    | TaskUpdateWithWhereUniqueWithoutProjectInput
  >;
  upsert?: Maybe<
    | TaskUpsertWithWhereUniqueWithoutProjectInput[]
    | TaskUpsertWithWhereUniqueWithoutProjectInput
  >;
  deleteMany?: Maybe<TaskScalarWhereInput[] | TaskScalarWhereInput>;
  updateMany?: Maybe<
    TaskUpdateManyWithWhereNestedInput[] | TaskUpdateManyWithWhereNestedInput
  >;
}

export interface ProjectScalarWhereInput {
  id?: Maybe<ID_Input>;
  id_not?: Maybe<ID_Input>;
  id_in?: Maybe<ID_Input[] | ID_Input>;
  id_not_in?: Maybe<ID_Input[] | ID_Input>;
  id_lt?: Maybe<ID_Input>;
  id_lte?: Maybe<ID_Input>;
  id_gt?: Maybe<ID_Input>;
  id_gte?: Maybe<ID_Input>;
  id_contains?: Maybe<ID_Input>;
  id_not_contains?: Maybe<ID_Input>;
  id_starts_with?: Maybe<ID_Input>;
  id_not_starts_with?: Maybe<ID_Input>;
  id_ends_with?: Maybe<ID_Input>;
  id_not_ends_with?: Maybe<ID_Input>;
  name?: Maybe<String>;
  name_not?: Maybe<String>;
  name_in?: Maybe<String[] | String>;
  name_not_in?: Maybe<String[] | String>;
  name_lt?: Maybe<String>;
  name_lte?: Maybe<String>;
  name_gt?: Maybe<String>;
  name_gte?: Maybe<String>;
  name_contains?: Maybe<String>;
  name_not_contains?: Maybe<String>;
  name_starts_with?: Maybe<String>;
  name_not_starts_with?: Maybe<String>;
  name_ends_with?: Maybe<String>;
  name_not_ends_with?: Maybe<String>;
  updatedAt?: Maybe<DateTimeInput>;
  updatedAt_not?: Maybe<DateTimeInput>;
  updatedAt_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  updatedAt_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  updatedAt_lt?: Maybe<DateTimeInput>;
  updatedAt_lte?: Maybe<DateTimeInput>;
  updatedAt_gt?: Maybe<DateTimeInput>;
  updatedAt_gte?: Maybe<DateTimeInput>;
  createdAt?: Maybe<DateTimeInput>;
  createdAt_not?: Maybe<DateTimeInput>;
  createdAt_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  createdAt_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  createdAt_lt?: Maybe<DateTimeInput>;
  createdAt_lte?: Maybe<DateTimeInput>;
  createdAt_gt?: Maybe<DateTimeInput>;
  createdAt_gte?: Maybe<DateTimeInput>;
  AND?: Maybe<ProjectScalarWhereInput[] | ProjectScalarWhereInput>;
  OR?: Maybe<ProjectScalarWhereInput[] | ProjectScalarWhereInput>;
  NOT?: Maybe<ProjectScalarWhereInput[] | ProjectScalarWhereInput>;
}

export interface UserUpdateInput {
  name?: Maybe<String>;
  email?: Maybe<String>;
  projects?: Maybe<ProjectUpdateManyWithoutUserInput>;
}

export interface ProjectUpsertWithWhereUniqueWithoutUserInput {
  where: ProjectWhereUniqueInput;
  update: ProjectUpdateWithoutUserDataInput;
  create: ProjectCreateWithoutUserInput;
}

export interface TaskUpdateWithoutProjectDataInput {
  done?: Maybe<Boolean>;
  description?: Maybe<String>;
}

export interface ProjectUpdateWithWhereUniqueWithoutUserInput {
  where: ProjectWhereUniqueInput;
  data: ProjectUpdateWithoutUserDataInput;
}

export interface TaskUpsertWithWhereUniqueWithoutProjectInput {
  where: TaskWhereUniqueInput;
  update: TaskUpdateWithoutProjectDataInput;
  create: TaskCreateWithoutProjectInput;
}

export interface UserCreateOneWithoutProjectsInput {
  create?: Maybe<UserCreateWithoutProjectsInput>;
  connect?: Maybe<UserWhereUniqueInput>;
}

export interface ProjectCreateWithoutUserInput {
  name: String;
  tasks?: Maybe<TaskCreateManyWithoutProjectInput>;
}

export interface TaskCreateManyWithoutProjectInput {
  create?: Maybe<
    TaskCreateWithoutProjectInput[] | TaskCreateWithoutProjectInput
  >;
  connect?: Maybe<TaskWhereUniqueInput[] | TaskWhereUniqueInput>;
}

export interface ProjectCreateManyWithoutUserInput {
  create?: Maybe<
    ProjectCreateWithoutUserInput[] | ProjectCreateWithoutUserInput
  >;
  connect?: Maybe<ProjectWhereUniqueInput[] | ProjectWhereUniqueInput>;
}

export interface ProjectSubscriptionWhereInput {
  mutation_in?: Maybe<MutationType[] | MutationType>;
  updatedFields_contains?: Maybe<String>;
  updatedFields_contains_every?: Maybe<String[] | String>;
  updatedFields_contains_some?: Maybe<String[] | String>;
  node?: Maybe<ProjectWhereInput>;
  AND?: Maybe<ProjectSubscriptionWhereInput[] | ProjectSubscriptionWhereInput>;
  OR?: Maybe<ProjectSubscriptionWhereInput[] | ProjectSubscriptionWhereInput>;
  NOT?: Maybe<ProjectSubscriptionWhereInput[] | ProjectSubscriptionWhereInput>;
}

export interface UserCreateInput {
  name: String;
  email: String;
  projects?: Maybe<ProjectCreateManyWithoutUserInput>;
}

export interface ProjectUpdateManyWithWhereNestedInput {
  where: ProjectScalarWhereInput;
  data: ProjectUpdateManyDataInput;
}

export interface TaskUpdateManyMutationInput {
  done?: Maybe<Boolean>;
  description?: Maybe<String>;
}

export interface ProjectUpdateWithoutUserDataInput {
  name?: Maybe<String>;
  tasks?: Maybe<TaskUpdateManyWithoutProjectInput>;
}

export interface ProjectUpsertWithoutTasksInput {
  update: ProjectUpdateWithoutTasksDataInput;
  create: ProjectCreateWithoutTasksInput;
}

export interface ProjectCreateInput {
  name: String;
  user: UserCreateOneWithoutProjectsInput;
  tasks?: Maybe<TaskCreateManyWithoutProjectInput>;
}

export interface ProjectUpdateWithoutTasksDataInput {
  name?: Maybe<String>;
  user?: Maybe<UserUpdateOneRequiredWithoutProjectsInput>;
}

export interface UserSubscriptionWhereInput {
  mutation_in?: Maybe<MutationType[] | MutationType>;
  updatedFields_contains?: Maybe<String>;
  updatedFields_contains_every?: Maybe<String[] | String>;
  updatedFields_contains_some?: Maybe<String[] | String>;
  node?: Maybe<UserWhereInput>;
  AND?: Maybe<UserSubscriptionWhereInput[] | UserSubscriptionWhereInput>;
  OR?: Maybe<UserSubscriptionWhereInput[] | UserSubscriptionWhereInput>;
  NOT?: Maybe<UserSubscriptionWhereInput[] | UserSubscriptionWhereInput>;
}

export interface TaskUpdateInput {
  project?: Maybe<ProjectUpdateOneRequiredWithoutTasksInput>;
  done?: Maybe<Boolean>;
  description?: Maybe<String>;
}

export interface ProjectCreateWithoutTasksInput {
  name: String;
  user: UserCreateOneWithoutProjectsInput;
}

export interface ProjectCreateOneWithoutTasksInput {
  create?: Maybe<ProjectCreateWithoutTasksInput>;
  connect?: Maybe<ProjectWhereUniqueInput>;
}

export interface TaskCreateInput {
  project: ProjectCreateOneWithoutTasksInput;
  done?: Maybe<Boolean>;
  description: String;
}

export type TaskWhereUniqueInput = AtLeastOne<{
  id: Maybe<ID_Input>;
}>;

export interface UserCreateWithoutProjectsInput {
  name: String;
  email: String;
}

export interface ProjectUpdateManyWithoutUserInput {
  create?: Maybe<
    ProjectCreateWithoutUserInput[] | ProjectCreateWithoutUserInput
  >;
  delete?: Maybe<ProjectWhereUniqueInput[] | ProjectWhereUniqueInput>;
  connect?: Maybe<ProjectWhereUniqueInput[] | ProjectWhereUniqueInput>;
  set?: Maybe<ProjectWhereUniqueInput[] | ProjectWhereUniqueInput>;
  disconnect?: Maybe<ProjectWhereUniqueInput[] | ProjectWhereUniqueInput>;
  update?: Maybe<
    | ProjectUpdateWithWhereUniqueWithoutUserInput[]
    | ProjectUpdateWithWhereUniqueWithoutUserInput
  >;
  upsert?: Maybe<
    | ProjectUpsertWithWhereUniqueWithoutUserInput[]
    | ProjectUpsertWithWhereUniqueWithoutUserInput
  >;
  deleteMany?: Maybe<ProjectScalarWhereInput[] | ProjectScalarWhereInput>;
  updateMany?: Maybe<
    | ProjectUpdateManyWithWhereNestedInput[]
    | ProjectUpdateManyWithWhereNestedInput
  >;
}

export type UserWhereUniqueInput = AtLeastOne<{
  id: Maybe<ID_Input>;
  email?: Maybe<String>;
}>;

export interface NodeNode {
  id: ID_Output;
}

export interface UserPreviousValues {
  id: ID_Output;
  name: String;
  email: String;
  updatedAt: DateTimeOutput;
  createdAt: DateTimeOutput;
}

export interface UserPreviousValuesPromise
  extends Promise<UserPreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  name: () => Promise<String>;
  email: () => Promise<String>;
  updatedAt: () => Promise<DateTimeOutput>;
  createdAt: () => Promise<DateTimeOutput>;
}

export interface UserPreviousValuesSubscription
  extends Promise<AsyncIterator<UserPreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  name: () => Promise<AsyncIterator<String>>;
  email: () => Promise<AsyncIterator<String>>;
  updatedAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  createdAt: () => Promise<AsyncIterator<DateTimeOutput>>;
}

export interface TaskEdge {
  node: Task;
  cursor: String;
}

export interface TaskEdgePromise extends Promise<TaskEdge>, Fragmentable {
  node: <T = TaskPromise>() => T;
  cursor: () => Promise<String>;
}

export interface TaskEdgeSubscription
  extends Promise<AsyncIterator<TaskEdge>>,
    Fragmentable {
  node: <T = TaskSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface User {
  id: ID_Output;
  name: String;
  email: String;
  updatedAt: DateTimeOutput;
  createdAt: DateTimeOutput;
}

export interface UserPromise extends Promise<User>, Fragmentable {
  id: () => Promise<ID_Output>;
  name: () => Promise<String>;
  email: () => Promise<String>;
  projects: <T = FragmentableArray<Project>>(args?: {
    where?: ProjectWhereInput;
    orderBy?: ProjectOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => T;
  updatedAt: () => Promise<DateTimeOutput>;
  createdAt: () => Promise<DateTimeOutput>;
}

export interface UserSubscription
  extends Promise<AsyncIterator<User>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  name: () => Promise<AsyncIterator<String>>;
  email: () => Promise<AsyncIterator<String>>;
  projects: <T = Promise<AsyncIterator<ProjectSubscription>>>(args?: {
    where?: ProjectWhereInput;
    orderBy?: ProjectOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => T;
  updatedAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  createdAt: () => Promise<AsyncIterator<DateTimeOutput>>;
}

export interface UserNullablePromise
  extends Promise<User | null>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  name: () => Promise<String>;
  email: () => Promise<String>;
  projects: <T = FragmentableArray<Project>>(args?: {
    where?: ProjectWhereInput;
    orderBy?: ProjectOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => T;
  updatedAt: () => Promise<DateTimeOutput>;
  createdAt: () => Promise<DateTimeOutput>;
}

export interface TaskConnection {
  pageInfo: PageInfo;
  edges: TaskEdge[];
}

export interface TaskConnectionPromise
  extends Promise<TaskConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<TaskEdge>>() => T;
  aggregate: <T = AggregateTaskPromise>() => T;
}

export interface TaskConnectionSubscription
  extends Promise<AsyncIterator<TaskConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<TaskEdgeSubscription>>>() => T;
  aggregate: <T = AggregateTaskSubscription>() => T;
}

export interface Task {
  id: ID_Output;
  done: Boolean;
  description: String;
  updatedAt: DateTimeOutput;
  createdAt: DateTimeOutput;
}

export interface TaskPromise extends Promise<Task>, Fragmentable {
  id: () => Promise<ID_Output>;
  project: <T = ProjectPromise>() => T;
  done: () => Promise<Boolean>;
  description: () => Promise<String>;
  updatedAt: () => Promise<DateTimeOutput>;
  createdAt: () => Promise<DateTimeOutput>;
}

export interface TaskSubscription
  extends Promise<AsyncIterator<Task>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  project: <T = ProjectSubscription>() => T;
  done: () => Promise<AsyncIterator<Boolean>>;
  description: () => Promise<AsyncIterator<String>>;
  updatedAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  createdAt: () => Promise<AsyncIterator<DateTimeOutput>>;
}

export interface TaskNullablePromise
  extends Promise<Task | null>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  project: <T = ProjectPromise>() => T;
  done: () => Promise<Boolean>;
  description: () => Promise<String>;
  updatedAt: () => Promise<DateTimeOutput>;
  createdAt: () => Promise<DateTimeOutput>;
}

export interface BatchPayload {
  count: Long;
}

export interface BatchPayloadPromise
  extends Promise<BatchPayload>,
    Fragmentable {
  count: () => Promise<Long>;
}

export interface BatchPayloadSubscription
  extends Promise<AsyncIterator<BatchPayload>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Long>>;
}

export interface PageInfo {
  hasNextPage: Boolean;
  hasPreviousPage: Boolean;
  startCursor?: String;
  endCursor?: String;
}

export interface PageInfoPromise extends Promise<PageInfo>, Fragmentable {
  hasNextPage: () => Promise<Boolean>;
  hasPreviousPage: () => Promise<Boolean>;
  startCursor: () => Promise<String>;
  endCursor: () => Promise<String>;
}

export interface PageInfoSubscription
  extends Promise<AsyncIterator<PageInfo>>,
    Fragmentable {
  hasNextPage: () => Promise<AsyncIterator<Boolean>>;
  hasPreviousPage: () => Promise<AsyncIterator<Boolean>>;
  startCursor: () => Promise<AsyncIterator<String>>;
  endCursor: () => Promise<AsyncIterator<String>>;
}

export interface TaskPreviousValues {
  id: ID_Output;
  done: Boolean;
  description: String;
  updatedAt: DateTimeOutput;
  createdAt: DateTimeOutput;
}

export interface TaskPreviousValuesPromise
  extends Promise<TaskPreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  done: () => Promise<Boolean>;
  description: () => Promise<String>;
  updatedAt: () => Promise<DateTimeOutput>;
  createdAt: () => Promise<DateTimeOutput>;
}

export interface TaskPreviousValuesSubscription
  extends Promise<AsyncIterator<TaskPreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  done: () => Promise<AsyncIterator<Boolean>>;
  description: () => Promise<AsyncIterator<String>>;
  updatedAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  createdAt: () => Promise<AsyncIterator<DateTimeOutput>>;
}

export interface AggregateProject {
  count: Int;
}

export interface AggregateProjectPromise
  extends Promise<AggregateProject>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateProjectSubscription
  extends Promise<AsyncIterator<AggregateProject>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface TaskSubscriptionPayload {
  mutation: MutationType;
  node: Task;
  updatedFields: String[];
  previousValues: TaskPreviousValues;
}

export interface TaskSubscriptionPayloadPromise
  extends Promise<TaskSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = TaskPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = TaskPreviousValuesPromise>() => T;
}

export interface TaskSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<TaskSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = TaskSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = TaskPreviousValuesSubscription>() => T;
}

export interface AggregateUser {
  count: Int;
}

export interface AggregateUserPromise
  extends Promise<AggregateUser>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateUserSubscription
  extends Promise<AsyncIterator<AggregateUser>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface UserConnection {
  pageInfo: PageInfo;
  edges: UserEdge[];
}

export interface UserConnectionPromise
  extends Promise<UserConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<UserEdge>>() => T;
  aggregate: <T = AggregateUserPromise>() => T;
}

export interface UserConnectionSubscription
  extends Promise<AsyncIterator<UserConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<UserEdgeSubscription>>>() => T;
  aggregate: <T = AggregateUserSubscription>() => T;
}

export interface ProjectPreviousValues {
  id: ID_Output;
  name: String;
  updatedAt: DateTimeOutput;
  createdAt: DateTimeOutput;
}

export interface ProjectPreviousValuesPromise
  extends Promise<ProjectPreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  name: () => Promise<String>;
  updatedAt: () => Promise<DateTimeOutput>;
  createdAt: () => Promise<DateTimeOutput>;
}

export interface ProjectPreviousValuesSubscription
  extends Promise<AsyncIterator<ProjectPreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  name: () => Promise<AsyncIterator<String>>;
  updatedAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  createdAt: () => Promise<AsyncIterator<DateTimeOutput>>;
}

export interface ProjectSubscriptionPayload {
  mutation: MutationType;
  node: Project;
  updatedFields: String[];
  previousValues: ProjectPreviousValues;
}

export interface ProjectSubscriptionPayloadPromise
  extends Promise<ProjectSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = ProjectPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = ProjectPreviousValuesPromise>() => T;
}

export interface ProjectSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<ProjectSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = ProjectSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = ProjectPreviousValuesSubscription>() => T;
}

export interface Project {
  id: ID_Output;
  name: String;
  updatedAt: DateTimeOutput;
  createdAt: DateTimeOutput;
}

export interface ProjectPromise extends Promise<Project>, Fragmentable {
  id: () => Promise<ID_Output>;
  name: () => Promise<String>;
  user: <T = UserPromise>() => T;
  tasks: <T = FragmentableArray<Task>>(args?: {
    where?: TaskWhereInput;
    orderBy?: TaskOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => T;
  updatedAt: () => Promise<DateTimeOutput>;
  createdAt: () => Promise<DateTimeOutput>;
}

export interface ProjectSubscription
  extends Promise<AsyncIterator<Project>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  name: () => Promise<AsyncIterator<String>>;
  user: <T = UserSubscription>() => T;
  tasks: <T = Promise<AsyncIterator<TaskSubscription>>>(args?: {
    where?: TaskWhereInput;
    orderBy?: TaskOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => T;
  updatedAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  createdAt: () => Promise<AsyncIterator<DateTimeOutput>>;
}

export interface ProjectNullablePromise
  extends Promise<Project | null>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  name: () => Promise<String>;
  user: <T = UserPromise>() => T;
  tasks: <T = FragmentableArray<Task>>(args?: {
    where?: TaskWhereInput;
    orderBy?: TaskOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => T;
  updatedAt: () => Promise<DateTimeOutput>;
  createdAt: () => Promise<DateTimeOutput>;
}

export interface ProjectEdge {
  node: Project;
  cursor: String;
}

export interface ProjectEdgePromise extends Promise<ProjectEdge>, Fragmentable {
  node: <T = ProjectPromise>() => T;
  cursor: () => Promise<String>;
}

export interface ProjectEdgeSubscription
  extends Promise<AsyncIterator<ProjectEdge>>,
    Fragmentable {
  node: <T = ProjectSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface ProjectConnection {
  pageInfo: PageInfo;
  edges: ProjectEdge[];
}

export interface ProjectConnectionPromise
  extends Promise<ProjectConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<ProjectEdge>>() => T;
  aggregate: <T = AggregateProjectPromise>() => T;
}

export interface ProjectConnectionSubscription
  extends Promise<AsyncIterator<ProjectConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<ProjectEdgeSubscription>>>() => T;
  aggregate: <T = AggregateProjectSubscription>() => T;
}

export interface UserEdge {
  node: User;
  cursor: String;
}

export interface UserEdgePromise extends Promise<UserEdge>, Fragmentable {
  node: <T = UserPromise>() => T;
  cursor: () => Promise<String>;
}

export interface UserEdgeSubscription
  extends Promise<AsyncIterator<UserEdge>>,
    Fragmentable {
  node: <T = UserSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface UserSubscriptionPayload {
  mutation: MutationType;
  node: User;
  updatedFields: String[];
  previousValues: UserPreviousValues;
}

export interface UserSubscriptionPayloadPromise
  extends Promise<UserSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = UserPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = UserPreviousValuesPromise>() => T;
}

export interface UserSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<UserSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = UserSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = UserPreviousValuesSubscription>() => T;
}

export interface AggregateTask {
  count: Int;
}

export interface AggregateTaskPromise
  extends Promise<AggregateTask>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateTaskSubscription
  extends Promise<AsyncIterator<AggregateTask>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export type Long = string;

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean;

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number;
export type ID_Output = string;

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string;

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number;

/*
DateTime scalar input type, allowing Date
*/
export type DateTimeInput = Date | string;

/*
DateTime scalar output type, which is always a string
*/
export type DateTimeOutput = string;

/**
 * Model Metadata
 */

export const models: Model[] = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "Project",
    embedded: false
  },
  {
    name: "Task",
    embedded: false
  }
];

/**
 * Type Defs
 */

export const prisma: Prisma;

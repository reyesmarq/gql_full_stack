import { Resolver, Query, Mutation, Arg, ObjectType, Field, Ctx, UseMiddleware } from "type-graphql"
import { hash, compare } from 'bcryptjs'
import { User } from "./entity/User"
import { MyContext } from "./MyContext"
import { createRefreshToken, createAccessToken } from "./auth"
import { isAuth } from "./isAuth"
import { sendRefreshtoken } from "./sendRefreshToen"

@ObjectType()
class LoginResponse {
  @Field()
  accesstoken: string
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return 'Hi!'
  }

  // Users that are authorize can access this route
  @Query(() => String)
  @UseMiddleware(isAuth)
  bye(
    @Ctx() {payload}: MyContext
  ) {
    console.log(payload)
    return `Your user id is: ${payload!.userId}`
  }

  @Query(() => [User])
  users() {
    return User.find()
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } })

    if (!user) {
      throw new Error('Could not find user')
    }

    const valid = await compare(password, user.password)

    if (!valid) {
      throw new Error('Bad password')
    }

    // login successful
    sendRefreshtoken(res, createRefreshToken(user))

    return {
      accesstoken: createAccessToken(user)
    }
  }

  @Mutation(() => Boolean)
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string
  ) {
    const hashedPassword = await hash(password, 12)
    try {
      await User.insert({
        email,
        password: hashedPassword
      })
    } catch (err) {
      console.log(err)
      return false
    }

    return true
  }
}
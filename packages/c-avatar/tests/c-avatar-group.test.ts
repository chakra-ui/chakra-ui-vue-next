import { render } from "../../test-utils/src"
import { CAvatar, CAvatarGroup, avatarGroupProps } from "../src"

interface AvatarOptions {
  name: string
  src?: string
}

const renderGroupAvatar = (urls: Array<AvatarOptions>, props?: any) => {
  let avatars = ""
  urls.forEach((avatar) => {
    avatars += `<CAvatar name="${avatar.name}" src="${avatar.src}" />`
  })

  const maxAvatars = props?.max ? `max=${props?.max}` : ""
  const template = (content) =>
    `<CAvatarGroup ${maxAvatars}>${content}</CAvatarGroup>`

  const component = {
    components: {
      CAvatar,
      CAvatarGroup,
    },
    template: template(avatars),
    props: avatarGroupProps,
  }

  return render(component)
}

const avatars = [
  { name: "Evan You" },
  {
    name: "Anthony Fu",
    src: "https://avatars.githubusercontent.com/u/11247099?v=4",
  },
  {
    name: "Sarah Drasner",
  },
  {
    name: "Jonathan Bakebwa",
  },
]

describe("CAvatarGroup", () => {
  it("renders group with 2 by default", () => {
    const { asFragment } = renderGroupAvatar(avatars)
    expect(asFragment()).toMatchSnapshot()
  })

  it("renders group with max prop passed", () => {
    const { asFragment } = renderGroupAvatar(avatars, { max: 3 })
    expect(asFragment()).toMatchSnapshot()
  })

  it("does not render number if max is reached", () => {
    const { asFragment } = renderGroupAvatar(avatars, { max: 4 })
    expect(asFragment()).toMatchSnapshot()
  })

  it("does not render number if max is higher than avatars", () => {
    const { asFragment } = renderGroupAvatar(avatars, { max: 10 })
    expect(asFragment()).toMatchSnapshot()
  })
})

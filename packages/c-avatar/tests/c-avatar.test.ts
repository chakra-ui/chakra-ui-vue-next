import { render, waitMs } from "../../test-utils/src"
import { CAvatar, avatarProps } from "../src"

const renderAvatar = (props?: any) => {
  const template = `<CAvatar name='${props.name}' src='${props.src}' />`

  const component = {
    components: {
      CAvatar,
    },
    template,
    props: avatarProps,
  }

  return render(component)
}

describe("CAvatar", () => {
  it("renders properly with default avatar svg by default", () => {
    const { asFragment } = render(CAvatar)
    expect(asFragment()).toMatchSnapshot()
  })

  it("renders initials when name is specified", () => {
    const { asFragment } = renderAvatar({ name: "Hello World" })
    expect(asFragment()).toMatchSnapshot()
  })
})

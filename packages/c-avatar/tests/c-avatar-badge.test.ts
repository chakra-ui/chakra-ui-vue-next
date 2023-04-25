import { render, waitMs } from "@chakra-ui/vue-test-utils"
import { CAvatar, CAvatarBadge, avatarProps } from "../src"

const renderAvatar = (props?: any) => {
  const placement = props.placement ? `placement='${props.placement}'` : ""
  const template = `<CAvatar name='${props.name}' src='${props.src}' ><CAvatarBadge ${placement} /></CAvatar>`

  const component = {
    components: {
      CAvatar,
      CAvatarBadge,
    },
    template,
    props: avatarProps,
  }

  return render(component)
}

describe("CAvatarBadge", () => {
  it("renders badge without parameters", () => {
    const { asFragment } = renderAvatar({ name: "Evan You" })
    expect(asFragment()).toMatchSnapshot()
  })
})

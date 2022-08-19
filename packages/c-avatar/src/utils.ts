import { filterUndefined } from "@chakra-ui/utils"

export const getInitials = (name: string) => {
  const [firstName, lastName] = name.split(" ")

  if (firstName && lastName) {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`
  } else {
    return name.charAt(0)
  }
}

export const extractImgAttrs = (attrs: any) => {
  const {
    alt,
    src,
    srcset,
    crossorigin,
    decoding,
    height,
    ismap,
    loading,
    referrerpolicy,
    sizes,
    width,
    usemap,
    ...rest
  } = attrs

  const imgAttrs = filterUndefined({
    alt,
    src,
    srcset,
    crossorigin,
    decoding,
    height,
    ismap,
    loading,
    referrerpolicy,
    sizes,
    width,
    usemap,
  })

  return {
    imgAttrs,
    rest,
  }
}

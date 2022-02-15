import { canUseDOM } from "@chakra-ui/utils"

export const defaultWindow = canUseDOM() ? window : null
export { canUseDOM }

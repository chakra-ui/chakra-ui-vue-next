import Component_1 from "../components/Home.vue";
const Component_2 = () => import('@chakra-ui/c-alert/examples/base-alert.vue')
const Component_3 = () => import('@chakra-ui/c-box/examples/base-box.vue')
const Component_4 = () => import('@chakra-ui/c-box/examples/box-with-chakra-directive.vue')
const Component_5 = () => import('@chakra-ui/c-button/examples/base-button.vue')

export default {
  "../components/Home.vue": Component_1,
  "@chakra-ui/c-alert/examples/base-alert.vue": Component_2,
  "@chakra-ui/c-box/examples/base-box.vue": Component_3,
  "@chakra-ui/c-box/examples/box-with-chakra-directive.vue": Component_4,
  "@chakra-ui/c-button/examples/base-button.vue": Component_5
}
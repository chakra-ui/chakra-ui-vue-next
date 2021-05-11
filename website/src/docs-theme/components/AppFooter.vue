<script lang="tsx">
import { defineComponent } from 'vue'
import siteConfig from '@/config/site-config'

type FooterLinkProps = {
  icon?: string
  href?: string
  label?: string
}

const FooterLink = ({ icon, href, label }: FooterLinkProps) => (
  <c-link display="inline-block" href={href} aria-label={label} isExternal>
    <c-icon name={icon} fontSize="xl" color="gray.400" />
  </c-link>
)

const links = [
  {
    icon: 'twitter',
    label: 'Twitter',
    href: siteConfig.twitter,
  },

  {
    icon: 'github',
    label: 'GitHub',
    href: siteConfig.repo.url,
  },

  {
    icon: 'youtube',
    label: 'YouTube',
    href: siteConfig.youtube,
  },
]

export default defineComponent({
  setup() {
    return () => {
      return (
        <c-box as="footer" mt="12" textAlign="center">
          <c-text fontSize="sm">
            <span> &copy; Chakra UI made </span>
            <span>by contributors</span>
          </c-text>
          <c-stack mt="4" direction="row" spacing="12px" justify="center">
            {links.map((link) => (
              <FooterLink key={link.href} {...link} />
            ))}
          </c-stack>
        </c-box>
      )
    }
  },
})
</script>

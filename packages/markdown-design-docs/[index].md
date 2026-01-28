<script setup lang="ts">
import { useRoute, useRouter } from 'vitepress'

const route = useRoute()
const router = useRouter()

router.go(`${route.path}guide/introduction`, { replace: true })
</script>

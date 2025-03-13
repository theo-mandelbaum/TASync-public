// import { Box, Container, Flex, Spinner } from "@chakra-ui/react"
import { Outlet, createFileRoute } from "@tanstack/react-router"


export const Route = createFileRoute("/_layout")({
  component: Layout,
})

function Layout() {
  return (
    <div>
      <h1>Layout</h1>
      <Outlet />
    </div>
  )
}

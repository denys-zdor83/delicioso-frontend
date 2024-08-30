import { prisma } from '@/prisma/prisma-client'
import { TopBar, Container, Title, Filters, ProductsGroupList } from '../../shared/components/shared'

export default async function Home() {

  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          ingredients: true,
          items: true,
        }
      }
    }
  })

  return(
    <>
      <Container className="mt-10">
        <Title text="All pizzas" size="lg" className="font-extrabold" />
      </Container>

      <TopBar 
        categories={categories.filter(category => category.products.length > 0)}
      />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">

          {/* Filters */}
          <div className="w-[250px]">
            <Filters />
          </div>

          {/* Products list */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {
                categories.map((category) => (
                  category.products.length > 0 && (
                    <ProductsGroupList 
                      title={category.name}
                      key={category.id}
                      categoryId={category.id}
                      items={category.products} 
                    />
                  )
                ))
              }

            </div>
          </div>

        </div>
      </Container>
    </>
  )
}

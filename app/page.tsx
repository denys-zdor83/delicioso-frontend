import { TopBar, Container, Title, Filters, ProductCard, ProductsGroupList } from '../components/shared'

export default function Home() {
  return(
    <>
      <Container className="mt-10">
        <Title text="All pizzas" size="lg" className="font-extrabold" />
      </Container>

      <TopBar />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">

          {/* Filters */}
          <div className="w-[250px]">
            <Filters />
          </div>

          {/* Products list */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList 
                title="Пиццы" 
                items={ Array.from(Array(10), (_, i) => ({ 
                  id: i, 
                  name: 'Пепперони', 
                  imageUrl: 'https://media.dodostatic.net/image/r:584x584/11EF39862058AE0581489070BB9C29EA.avif', 
                  items: [
                    { id: 1, price: 700 },
                    { id: 2, price: 550 },
                    { id: 3, price: 600 },
                  ]
                }))} 
                categoryId={1} 
              />

              <ProductsGroupList 
                title="Комбо" 
                items={ Array.from(Array(10), (_, i) => ({ 
                  id: i, 
                  name: 'Пепперони', 
                  imageUrl: 'https://media.dodostatic.net/image/r:584x584/11EF39862058AE0581489070BB9C29EA.avif', 
                  items: [
                    { id: 1, price: 700 },
                    { id: 2, price: 550 },
                    { id: 3, price: 600 },
                  ]
                }))}
                categoryId={2} 
              />
            </div>
          </div>

        </div>
      </Container>
    </>
  )
}

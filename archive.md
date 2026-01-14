```tsx
function(){
return <>
        <div className="flex min-h-50 items-center justify-center">
          <Chip size="sm" color="red" fill="dark">
            Health Care
          </Chip>
        </div>

        <div className="flex min-h-50 items-center justify-center bg-neutral-50 p-2">
          <DataCard>
            <DataCard.Context>
              <DataCard.Subtitle>Climate Type</DataCard.Subtitle>
              <Chip size="xs" color="yellow" fill="light">
                Warm
              </Chip>
            </DataCard.Context>
            <DataCard.Title>Tropical</DataCard.Title>
            <DataCard.Text>
              Panama has a tropical climate with consistently warm weather
              year-round
            </DataCard.Text>
          </DataCard>
        </div>

        <div className="flex min-h-50 items-center justify-center bg-neutral-50 p-2">
          <DataCard>
            <DataCard.Title>Quick Facts</DataCard.Title>
            <DataCard.Table>
              <DataCard.Table.Row>
                <DataCard.Table.Row.Key>
                  Official Language
                </DataCard.Table.Row.Key>
                <DataCard.Table.Row.Value>Spanish</DataCard.Table.Row.Value>
              </DataCard.Table.Row>

              <DataCard.Table.Row>
                <DataCard.Table.Row.Key>Currency</DataCard.Table.Row.Key>
                <DataCard.Table.Row.Value>Dollars</DataCard.Table.Row.Value>
              </DataCard.Table.Row>

              <DataCard.Table.Row>
                <DataCard.Table.Row.Key>Climate</DataCard.Table.Row.Key>
                <DataCard.Table.Row.Value>Tropical</DataCard.Table.Row.Value>
              </DataCard.Table.Row>
            </DataCard.Table>
          </DataCard>
        </div>

        <div className="flex min-h-50 items-center justify-center bg-neutral-50 p-2">
          <div className="flex items-center justify-center">
            <DataCard>
              <DataCard.Context>
                <DataCard.Subtitle>Safety Index</DataCard.Subtitle>
                <Chip size="xs" color="green" fill="light">
                  Moderate
                </Chip>
              </DataCard.Context>
              <DataCard.Title>57.3</DataCard.Title>
            </DataCard>
          </div>
        </div>

        <Preview>
          <Preview.Title href="#">Affordable</Preview.Title>

          <Preview.Slider>
            <Preview.Slider.Item>
              <PanamaCard />
            </Preview.Slider.Item>

            <Preview.Slider.Item>
              <PanamaCard />
            </Preview.Slider.Item>

            <Preview.Slider.Item>
              <PanamaCard />
            </Preview.Slider.Item>
          </Preview.Slider>
        </Preview>
        </>
        }

function PanamaCard() {
  return (
    <Preview.Card>
      <Preview.Card.Image
        alt="image"
        src="/images/countries/panama-800-1000.jpg"
      />

      <Preview.Card.ControlBar>
        <Preview.Card.MetaData>Tropical</Preview.Card.MetaData>
      </Preview.Card.ControlBar>

      <Preview.Card.Details>
        <Preview.Card.Header>
          <Preview.Card.Title>Panama</Preview.Card.Title>

          <Preview.Card.Subtitle>
            <Preview.Card.Subtitle.Text>
              South America
            </Preview.Card.Subtitle.Text>

            <Preview.Card.Subtitle.Divider />

            <Preview.Card.Subtitle.Text>
              $900 - $2000/mo
            </Preview.Card.Subtitle.Text>
          </Preview.Card.Subtitle>
        </Preview.Card.Header>

        <Preview.Card.KeyFactors>
          <Preview.Card.KeyFactors.Item>
            <Chip fill="light" color="red" size="xs">
              <ScaleIcon className="size-3.5" />
              Corruption
            </Chip>
          </Preview.Card.KeyFactors.Item>

          <Preview.Card.KeyFactors.Item>
            <Chip fill="light" color="yellow" size="xs">
              <HeartPulseIcon className="size-3.5" />
              Health Care
            </Chip>
          </Preview.Card.KeyFactors.Item>

          <Preview.Card.KeyFactors.Item>
            <Chip fill="light" color="green" size="xs">
              <BadgeCheckIcon className="size-3.5" />
              Safety
            </Chip>
          </Preview.Card.KeyFactors.Item>
        </Preview.Card.KeyFactors>
      </Preview.Card.Details>
    </Preview.Card>
  );
}
```

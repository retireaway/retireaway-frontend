# Specilaist - Draft

## Prequisite Recap

### Core Platform Philosophy

RetireAway is a retirement research platform with the goal of helping future international retirees make informed decisions on their retirement.
The platform aims to function both as a one stop shop for retirement research and a launchpad facilitating deeper research into various aspects for retirement.

This will accomplish this by;

- gathering resources and expertise from various resources on any and all topics relating to international retirement
- sythesizing that information into various formats that are easily accessible and digestible by retirees
- augmenting the synthesized information by incoperating rich links to the different resources to the relevant topics.

### Platform Categorization

_Categories_ represent a broad area or domain of services required by a retiree.
They provide a high level way to classify the complex and vast corpus of knowledge a retiree would need to navigate in order to completely plan out .
This offers a quick, at a glance way to convey information and structure to a user without overwhelming them.

_Subcategories_
Narrow down the category into distinct granular areas allowing for more fine tuning

## The Specialist Feature

A _Specialist_ is an entity that provides one or more services that might be of interest to a retiree.
They might have one or more categories representing the broad domains in which it operates and one or more subcategories intended to convey the area of experties within that braoder domain.
Each service provided by a specialist will also have one or more categories and subcategories which will be restricted to a subset of the categories and subcategories of the owning specialist.

Following the philosophy of the platform the goal will be to provide as much distilled information about various specialist and their services as well as guide users to resources to dive deeper.

For the Specialist we provide an overview.
At a high level this is an article summarizing findings from different resources on the specialist.
It should contain everything and anything a retiree might need to know about a specialist and their services in an easy to read yet detailed summary.
This may include;

- Background and introduction
- A summary of the services offered; requirements, cost, reviews.
- Overall reviews, community sentiment and ratings of the Specialist.
- Alternatives, competitors and how they compare.

We note other useful information about the Specialist

- name
- email
- telephone
- image (logo/cover)

We mark Specialist with whom we are partnered so they may be prioritized in the UI

We also store the coverage of specialists as a list of the various source -> target country relationships for which a Specialist has applicable services.

- _What are the broad considerations that I should have when retiring abroad?_
  Answered by the platform categories "You should consider healthcare, finances, logistics, immigration, housing e.t.c"

- _Why are they important?_
  Answered by the descriptions of the categories in question

- _What solutions are available to address these considerations?_
  Answered by the services provided by Specialists which fall under the category in question

- _Who provides services to address these considerations?_
  Answered by the currated Specialists on the platform

- _Who is this Specialist?_

- _How much can I trust this Specialist?_

- _What services does this Specialist offer?_

- _What services does this Specialist offer?_

- _What is this service?_

- _What are the requirement for this service?_

- _How to I obtain this service?_

- _What should I expect from this service?_

- _What will my experience be; positive or negative?_

- _Are there other alternatives to this service?_

Now taking into account the goal/value propsition of the platform we need to expand on that while keeping in mind the restricion of keeping things simple for this first draft.

Say we've picked a specialist and we subsequently conduct research on said specialist.
The most straight forward way so convey the findings to a user is a write up that synthesizes the findings into a easily digestable form.
Based on this thought process we might add an overview field to the schema.
Keeping it simple we could make is an array of objects each representing a paragraph with a title, subtitle and body property.

```json
{
  "properties": {
    "overview": {
      "type": "array",
      "description": "a detailed overview of the specialist",
      "items": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string",
            "description": "the title of the paragraph"
          },
          "subtitle": {
            "type": "string",
            "description": "the subtitle of the paragraph"
          },
          "body": {
            "type": "string",
            "description": "the body of the paragraph"
          }
        }
      }
    }
  }
}
```

we might also collect each resource encountered during the research of the specialist so that we may process it and display it to the user for further reading.
To that end we might then add a resources field. This would be an array of "Resource" objects
Again keeping it simple each resource object could have, an id, a title, a subtitle, a description that would be the summary of the resource, a copy that would the exact data of the resource this field should probably be optional, the url of the resource, mime type of the resource and the platform of the resource, this would be a unique identifier of the platform the resource is hosted on and can be used for ui styling purposes. I could for example be the url of the platform where possible, e.g "www.youtube.com", "www.reddit.com", "www.trustpilot.com"

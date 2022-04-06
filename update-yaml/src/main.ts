import * as core from '@actions/core'
import * as yaml from 'yaml'
import * as fs from 'fs'
import * as nestedProperty from 'nested-property'


async function run(): Promise<void> {
  try {
    const filename: string = core.getInput('filename')
    const propertyToChange: string = core.getInput('property-to-change')
    const value: string = core.getInput('value-to-change')
    
    const content = yaml.parse(fs.readFileSync(filename, 'utf8').toString())

    console.log(nestedProperty.set(content, propertyToChange, value));

    console.log(content)

    fs.writeFileSync(filename, yaml.stringify(content))
    
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()

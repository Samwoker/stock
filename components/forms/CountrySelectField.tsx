'use client'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Check, ChevronsUpDown } from "lucide-react"
import countryList from 'react-select-country-list'
import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import { Controller } from "react-hook-form"



const getFlagEmoji = (countryCode: string)=>{
  return countryCode ? countryCode.toUpperCase().replace(/./g, (char)=>(
    String.fromCodePoint(127397 + char.charCodeAt(0))
  )):''
}


const CountrySelectField = ({
  name,
  label,
  control,
  error,
  required = false,
}: CountrySelectProps) => {
  const [open, setOpen] = useState(false)
  const options = useMemo(() => countryList().getData(), [])

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="form-label">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => {
          const selectedCountry = options.find((c) => c.value === value)

          return (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between bg-gray-900 text-gray-100 border-gray-700 hover:bg-gray-800 py-6"
                >
                  {selectedCountry ? (<span className="flex items-center gap-2">
                     <span className="text-lg">
                        {getFlagEmoji(selectedCountry.value)}
                     </span>
                     {selectedCountry.label}
                  </span>):("Select a country")}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-full p-0 bg-gray-900 text-gray-100 border-gray-700">
                <Command className="bg-gray-800 border-gray-600 text-white">
                  <CommandInput placeholder="Search country..." />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Countries">
                      {options.map((country) => (
                        <CommandItem
                          key={country.value}
                          onSelect={() => {
                            onChange(country.value)
                            setOpen(false)
                          }}
                          className="cursor-pointer focus:bg-gray-900 focus:text-white"
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              country.value === value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          <span className="text-lg">
                            {getFlagEmoji(country.value)}
                          </span>
                          {country.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          )
        }}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}

export default CountrySelectField

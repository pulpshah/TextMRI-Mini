import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
  } from "@/components/ui/command"
  
  type SearchDialogProps = {
    isSearchOpen: boolean;
    setIsSearchOpen: (isOpen: boolean) => void;
  }
  
  export default function SearchDialog({ isSearchOpen, setIsSearchOpen }: SearchDialogProps) {
    return (
      <>
        <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>Search Transcript</CommandItem>
              <CommandItem>Find Speaker</CommandItem>
              <CommandItem>Jump to Turn</CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem>Change Theme</CommandItem>
              <CommandItem>Adjust Volume</CommandItem>
              <CommandItem>Toggle Related Media</CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
  
        {isSearchOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm z-40" onClick={() => setIsSearchOpen(false)}></div>
        )}
      </>
    )
  }
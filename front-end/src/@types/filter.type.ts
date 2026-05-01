export type FiltersProps = {
    filters: {
        selectedGenres: any[]
        selectedPlatforms: any[]
        selectedPublishers: any[]
        selectedCategories: any[]
        selectedDate?: number,
        selectedRating?: number,
        selectedOnline?: boolean,
        
    }
    setters: {
        setSelectedGenres: React.Dispatch<any[]>
        setSelectedPlatforms: React.Dispatch<any[]>
        setSelectedPublishers: React.Dispatch<any[]>
        setSelectedCategories: React.Dispatch<any[]>
        setSelectedDate: React.Dispatch<number>
        setSelectedRating: React.Dispatch<number>
        setSelectedOnline: React.Dispatch<React.SetStateAction<boolean>>
    }
    module:  Record<string, string>
}
export type FiltersProps = {
    filters: {
        name: string,
        selectedGenres: any[]
        selectedPlatforms: any[]
        selectedPublishers: any[]
        selectedCategories: any[]
        selectedDate?: number,
        selectedRating?: number,
        selectedOnline?: boolean,
        selectedFree?: boolean,
    }
    setters: {
        setName: React.Dispatch<string>,
        setSelectedGenres: React.Dispatch<any[]>
        setSelectedPlatforms: React.Dispatch<any[]>
        setSelectedPublishers: React.Dispatch<any[]>
        setSelectedCategories: React.Dispatch<any[]>
        setSelectedDate: React.Dispatch<number>
        setSelectedRating: React.Dispatch<number>
        setSelectedOnline: React.Dispatch<React.SetStateAction<boolean>>
        setSelectedFree: React.Dispatch<React.SetStateAction<boolean>>
    }
    module:  Record<string, string>
}
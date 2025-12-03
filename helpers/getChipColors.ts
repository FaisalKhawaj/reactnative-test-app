export function getChipColor(title: string) {
    switch (title) {
        case 'Action':
            return '#15D2BC';
        case 'Thriller':
            return '#E26CA5';
        case 'Science':
            return '#564CA3';
        case 'Fiction':
            return '#CD9D0F';
        case 'Crime':
            return 'orange';
            default:
                return 'red'
    }
}
function mapSize(size) {
    let sizeToMap = size?.toLowerCase();
    switch (sizeToMap) {
        case 's':
            return 'Small'
        case 'xs':
            return 'Extra Small'
        case 'm':
            return 'Medium'
        case 'l':
            return 'Large'
        case 'xl':
            return 'Extra Large'
        case 'xxl':
            return 'Extra Extra Small'
        default:
            return 'Select Your Size'
    }
}

export default mapSize
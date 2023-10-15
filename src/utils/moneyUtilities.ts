interface ICalculateDiscountModel {
  originalPrice: number
  discountPercentage: number
}

export const calculateDiscountPrice = ({
  originalPrice,
  discountPercentage
}: ICalculateDiscountModel): number | string => {
  if (originalPrice <= 0 || discountPercentage < 0 || discountPercentage > 100) {
    return 'Invalid input. Please enter valid values.'
  }

  const discountAmount = (originalPrice * discountPercentage) / 100
  const discountedPrice = originalPrice - discountAmount
  return discountedPrice
}

export const convertToIDRFormat = (price: number | any): string => {
  return price
    .toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
    .slice(0, -3)
}

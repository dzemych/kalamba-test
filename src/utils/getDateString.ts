const monthNames = [
   "January",
   "February",
   "March",
   "April",
   "May",
   "June",
   "July",
   "August",
   "September",
   "October",
   "November",
   "December"
]

function getSuffix(i: number): string {
   const j = i % 10,
      k = i % 100;
   if (j == 1 && k != 11) {
      return i + "st";
   }
   if (j == 2 && k != 12) {
      return i + "nd";
   }
   if (j == 3 && k != 13) {
      return i + "rd";
   }
   return i + "th";
}

export default function (dateString: Date): string {
   const date = new Date(dateString)

   const month = monthNames[date.getMonth()]
   const day = date.getDate()

   const dayWithSuffix = getSuffix(day)

   return `${month} ${dayWithSuffix}`
}
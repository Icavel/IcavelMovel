// src/hooks/useVehicleImages.ts
import { useMemo } from 'react';

const VEHICLE_IMAGES_BY_COLOR: Record<string, Record<string, string>> = {
  constellation: {
    "Bege Agata": "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr02YYDtsqdKFseCcpqzHrUtMBAR9VumY4aWDIh",
    "Laranja": "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0hJLv9XeXeVMRwOltd6mGH1Q9oEKAj4bJPYnc",
    "Azul Biscay": "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0WS1Lke4KMuTloxRN7rU4yiFEIsAnvPz3HB2k",
    "Vermelho": "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0ul6LHEVtqGATQO1zXaIh2VKYlx7DMoRfPJ8u",
    "Amarelo Bem-te-vi": "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0FQg2EYi1Nu85fCjEqUGF4ShW0BLK2Q9oetJw",
    "Cinza MoonStone": "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0TN37PQwQq8tcohsp3zfJbrmlFSZ0LIYnyGBg",
    "Branco Polar": "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr02YYDtsqdKFseCcpqzHrUtMBAR9VumY4aWDIh" 
  },
  meteor: {
    "Prata Pyrit": "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0AclrkEUluVP8NKwvb2Zzy4ip195ahGD7gAT6",
    "Vermelho Rubi": "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0uEpE75VtqGATQO1zXaIh2VKYlx7DMoRfPJ8u",
    "Azul Biscay": "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0ymwvp4SwAKxFhk9eiYJvqRu1LOf3TZtnjdIo",
    "Preto Universal": "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0jF6QauTpnQ1BeImtf4U09XVAMiu7lGKWChv5",
    "Branco Gelo":   "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr085pteWM9ZOafCkVHPsWqdjIFy3NUz6XKtiwb",
    "Bega Agata": "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0vYirdqltWkVFrLscwKlaUoY8B9eZHm2yDpz0",
    "Verde Turquesa": "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0qVYiCaKKEuBMIyJ7TZsox1eXWNOAg3GQawS5",
    "Amarelo Bem-te-vi": "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0SGzWxLnE1JtEXpV0f2kdZmvGbuFnrPRg8ija",
    "Cinza Moonstone":  "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0JkAacqWuV0vIZ97H8WMrdhYUEm5jAo3sRqSk",
    "Azul Unique":  "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0oXQ3vTCkrn5e3P96qY4K7bOAatLUuDXzGRFc",
  },
  delivery: {
    "Branco gelo": "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0QJYquWXBFSiugpXPo13x7Dmj4T2JUf8EZWCH",
    "Laranja Safaty":  "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0eFEP5NCEbxGi5NQcAgOoz90UWutYymLdphqX6",
    "Azul Biscay": "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0F6m9mEi1Nu85fCjEqUGF4ShW0BLK2Q9oetJw",
    "Amarelo Bem-te-vi": "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0dCY4vlrOzs3jGHqVxX2NQYaeLZtom64igWbp",
    "Cinza Moonstone":  "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0IjbaVZ52vLeKVUf0JkMdWSb6n8psEYyOBH7R",
    "Vermelho Coca-cola": "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0NConQY7hix2U5l71Xumz6YOgqnryEGZ8Meot",
    "Verde Limão": "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0sQO9RCwoujKcEJZnxpINqM1L3Pdy6UD78eHF",
    "Prata Pyrit":  "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr06tjBB9ySarjJxgwdi6tRWoLNCunz7hEPy5XZ",
    "Preto Universal":  "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0SxnxYfE1JtEXpV0f2kdZmvGbuFnrPRg8ijae",
  }
};

export const useVehicleImages = (modelType: string, colorName: string) => {
  return useMemo(() => {
    const modelImages = VEHICLE_IMAGES_BY_COLOR[modelType.toLowerCase()] || 
                       VEHICLE_IMAGES_BY_COLOR.constellation;
    
    return modelImages[colorName] || 
           modelImages["Bege Agata"] || 
           "https://via.placeholder.com/400x250?text=Imagem+do+Veículo";
  }, [modelType, colorName]);
};
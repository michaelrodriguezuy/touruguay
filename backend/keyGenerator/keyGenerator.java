import java.security.SecureRandom;
import java.util.Base64;

public class KeyGenerator {
    public static void main(String[] args) {
        // Genera una clave aleatoria de 256 bits
        byte[] key = generateRandomKey(32);

        // Codifica la clave en formato Base64 para su uso
        String base64Key = Base64.getEncoder().encodeToString(key);

        System.out.println("Generated Key: " + base64Key);
    }

    private static byte[] generateRandomKey(int length) {
        SecureRandom secureRandom = new SecureRandom();
        byte[] key = new byte[length];
        secureRandom.nextBytes(key);
        return key;
    }
}

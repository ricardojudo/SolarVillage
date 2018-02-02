package ricardojudo.solar_village.domain.json;

import com.fasterxml.jackson.core.JsonProcessingException;
import java.io.IOException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.core.JsonParser;
import ricardojudo.solar_village.domain.PermitRequest;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;

public class StatusDeserializer extends StdDeserializer<PermitRequest.Status>
{
    private static final long serialVersionUID = 4748945048179421044L;
    
    protected StatusDeserializer() {
        super(PermitRequest.Status.class);
    }
    
    public PermitRequest.Status deserialize(final JsonParser parser, final DeserializationContext context) throws IOException, JsonProcessingException {
        final String value = parser.getText().toUpperCase();
        return PermitRequest.Status.valueOf(value);
    }
}
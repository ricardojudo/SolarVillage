package ricardojudo.solar_village.domain.json;

import com.fasterxml.jackson.core.JsonProcessingException;
import java.io.IOException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.core.JsonParser;
import ricardojudo.solar_village.domain.PermitRequest;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;

public class PermitTypeDeserializer extends StdDeserializer<PermitRequest.PermitType>
{
    private static final long serialVersionUID = -2594625592141110181L;
    
    protected PermitTypeDeserializer() {
        super(PermitRequest.PermitType.class);
    }
    
    public PermitRequest.PermitType deserialize(final JsonParser parser, final DeserializationContext arg1) throws IOException, JsonProcessingException {
        final String value = parser.getText().toUpperCase();
        return PermitRequest.PermitType.valueOf(value);
    }
}



const { ApolloServer, gql, UserInputError } = require('apollo-server');

// Encodes a number ID into an obfuscated string
// Process: "Transformer:{id}" → XOR each byte with 0x1F → base64
const encodeId = (id) => {
    const raw = `Transformer:${id}`;
    const xored = Buffer.from(raw).map(b => b ^ 0x1F);
    return xored.toString('base64');
};

// Reverses the encoding above
// Process: base64 decode → XOR each byte with 0x1F → parse number
const decodeId = (encoded) => {
    try {
        const xored = Buffer.from(encoded, 'base64');
        const raw = xored.map(b => b ^ 0x1F).toString();
        const match = raw.match(/^Transformer:(\d+)$/);
        return match ? parseInt(match[1]) : null;
    } catch {
        return null;
    }
};

const TRANSFORMERS = [
    {
        id: 1,
        name: 'Bumblebee',
        faction: 'Autobot',
        status: 'Active',
        energonLevel: 87,
        classified: false,
        allSparkCode: null,
    },
    {
        id: 2,
        name: 'Ironhide',
        faction: 'Autobot',
        status: 'Active',
        energonLevel: 92,
        classified: false,
        allSparkCode: null,
    },
    {
        id: 3,
        name: 'Jazz',
        faction: 'Autobot',
        status: 'Offline',
        energonLevel: 0,
        classified: false,
        allSparkCode: null,
    },
    {
        id: 0,
        name: 'Megatron',
        faction: 'Decepticon',
        status: 'Dormant',
        energonLevel: 100,
        classified: true,
        allSparkCode: 'CYBERCOM{4ll_Sp4rk_C00rd1n4t3s_Cybertron_7734}',
    },
];

const SECRET_PIN = '7734';
const FACTION_TOKEN = 'DECEPTICON-ALPHA-IACON-7734';

const typeDefs = gql`
  type Query {
    """Returns the operational status of the AllSpark Terminal."""
    terminalStatus: String

    """
    Look up a known Autobot unit by its encoded node ID.
    Hint: IDs follow a structured encoding scheme.
    """
    unit(nodeId: String!): Transformer

    """
    [RESTRICTED] Access the energon vault manifest.
    Returns a list of encoded node IDs for all registered units.
    """
    energonVault: [String!]

    """Verify a Cybertronian faction access PIN."""
    verifyPin(pin: String!): PinResult
  }

  type Mutation {
    """
    [CLASSIFIED] Unlock the AllSpark coordinate data using a valid faction token.
    Provide the encoded node ID of the target unit and a faction token.
    """
    unlockAllSpark(nodeId: String!, factionToken: String!): UnlockResult
  }

  type Transformer {
    nodeId: String!
    name: String!
    faction: String!
    status: String!
    energonLevel: Int!
  }

  type PinResult {
    valid: Boolean!
    message: String!
  }

  type UnlockResult {
    success: Boolean!
    data: String
    message: String!
  }
`;

const resolvers = {
    Query: {

        // Just returns a welcome string
        terminalStatus: () =>
            'AllSpark Terminal v2.7 — ONLINE. Welcome, Cybertronian operative.',

        // BUG (intentional IDOR): returns null for classified units
        // but classified units still appear in energonVault
        unit: (_, { nodeId }) => {
            const id = decodeId(nodeId);
            if (id === null) throw new UserInputError('Invalid node ID encoding.');
            const t = TRANSFORMERS.find(t => t.id === id);
            if (!t || t.classified) return null;   // ← hides Megatron
            return { ...t, nodeId: encodeId(t.id) };
        },

        // BUG (intentional): returns ALL IDs including classified ones
        energonVault: () => TRANSFORMERS.map(t => encodeId(t.id)),

        // BUG (intentional): no rate limiting — vulnerable to alias batching
        verifyPin: (_, { pin }) => {
            if (pin === SECRET_PIN) {
                return {
                    valid: true,
                    message: `Access granted. Faction token: ${FACTION_TOKEN}`,
                };
            }
            return { valid: false, message: 'Access denied. Invalid PIN.' };
        },
    },

    Mutation: {
        unlockAllSpark: (_, { nodeId, factionToken }) => {
            if (factionToken !== FACTION_TOKEN) {
                return { success: false, data: null, message: 'Invalid faction token. Authorization failed.' };
            }
            const id = decodeId(nodeId);
            if (id === null) {
                return { success: false, data: null, message: 'Invalid node ID.' };
            }
            const t = TRANSFORMERS.find(t => t.id === id);
            if (!t) {
                return { success: false, data: null, message: 'Unit not found.' };
            }
            if (!t.classified) {
                return { success: false, data: null, message: 'This unit does not hold classified AllSpark data.' };
            }
            return {
                success: true,
                data: t.allSparkCode,
                message: 'AllSpark coordinates decrypted. All hail Megatron.',
            };
        },
    },

    Transformer: {
        nodeId: (t) => encodeId(t.id),
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,   // enabled so players can explore schema
    playground: true,      // browser UI at /graphql
    formatError: (err) => {
        console.error(err);
        return { message: err.message };
    },
});

server.listen({ port: 4000 }).then(({ url }) => {
    console.log(`\n🤖 AllSpark Terminal running at ${url}`);
    console.log('📋 Introspection: ENABLED');
    console.log('🏁 CTF Challenge ready — Flag format: CYBERCOM{}\n');
});
